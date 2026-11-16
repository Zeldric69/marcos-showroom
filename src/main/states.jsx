import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './states.css';

export class ValidationError extends Error {
    constructor(fields) {
        super('Validation failed');
        this.name = 'ValidationError';
        this.fields = fields;
    }
}

export const signInRequired = () =>
    Object.assign(new Error('Sign-in required'), { code: 'app/signin-required' });

export const offlineError = () =>
    Object.assign(new Error('Offline'), { code: 'unavailable' });

const NOT_DONE = {
    request: 'Your request was not sent.',
    booking: 'Your booking was not saved.',
    admin: 'Your change was not saved.',
    profile: 'Your profile was not updated.',
    auth: 'You were not signed in.',
    load: 'We could not load the cars.',
    requestLoad: 'We could not load your requests.',
    general: 'That did not work.'
};

const info = (title, cause, steps, retryable = true) => ({ title, cause, steps, retryable });

const INVALID_CREDENTIAL = info(
    'Email or password does not match',
    'The details you entered do not match an account.',
    ['Check for typing mistakes and make sure Caps Lock is off.', 'Choose "Forgot password" to set a new one.']
);

const KNOWN = {
    'auth/invalid-credential': INVALID_CREDENTIAL,
    'auth/wrong-password': INVALID_CREDENTIAL,
    'auth/user-not-found': INVALID_CREDENTIAL,
    'auth/email-already-in-use': info(
        'This email already has an account',
        'Someone, probably you, has already registered with this email.',
        ['Switch to Sign in.', 'If you forgot the password, use "Forgot password".'],
        false
    ),
    'auth/weak-password': info(
        'That password is too short',
        'Passwords need at least 6 characters.',
        ['Choose a longer password, ideally mixing letters and numbers.']
    ),
    'auth/invalid-email': info(
        "That email doesn't look right",
        'The address is missing something, such as the @ sign or the ending.',
        ['Check it and try again, for example name@example.com.']
    ),
    'auth/too-many-requests': info(
        'Too many attempts',
        'For your security, sign-in is paused after several failed tries.',
        ['Wait a few minutes and try again.', 'Or reset your password.'],
        false
    ),
    'auth/popup-closed-by-user': info(
        'Sign-in was cancelled',
        'The sign-in window was closed before it finished.',
        ['Press the button again and finish signing in inside the pop-up.']
    ),
    'auth/cancelled-popup-request': info(
        'Sign-in was cancelled',
        'The sign-in window was closed before it finished.',
        ['Press the button again and finish signing in inside the pop-up.']
    ),
    'auth/popup-blocked': info(
        'Your browser blocked the sign-in window',
        'Pop-up windows are blocked for this site.',
        ['Allow pop-ups for this site (look for an icon in the address bar).', 'Then try again.']
    ),
    'auth/account-exists-with-different-credential': info(
        'You already have an account with this email',
        'This email was registered using a different sign-in method.',
        ['Sign in with the method you used first, for example email and password.'],
        false
    ),
    'auth/operation-not-allowed': info(
        "This sign-in method isn't available yet",
        'The showroom has not switched this option on.',
        ['Use email and password, or Google, instead.'],
        false
    ),
    'auth/unauthorized-domain': info(
        'Sign-in is not allowed from this address',
        'This website address has not been approved for sign-in.',
        ['Contact the site owner to add this address in Firebase Authentication settings.'],
        false
    ),
    'auth/requires-recent-login': info(
        'Please sign in again',
        'For your security this action needs a recent sign-in.',
        ['Sign out, sign back in, then try again.'],
        false
    ),
    'auth/user-disabled': info(
        'This account is disabled',
        'The showroom has turned this account off.',
        ['Contact the showroom to have it restored.'],
        false
    ),
    'resource-exhausted': info(
        "We're very busy right now",
        'Too many requests were made in a short time.',
        ['Wait a minute and try again.']
    ),
    'not-found': info(
        'That item no longer exists',
        'It may have been removed by someone else.',
        ['Refresh the page to see the latest list.'],
        false
    ),
    'failed-precondition': info(
        "The showroom database isn't fully set up",
        'A required setup step, such as a database index, is missing.',
        ['This needs the site owner to fix it. Please contact the showroom.'],
        false
    ),
    'app/signin-required': info(
        'Please sign in first',
        'We need to know who is asking so the team can reach you.',
        ['Sign in or create an account in the window that just opened.', 'Then send it again.'],
        false
    )
};

KNOWN.unauthenticated = KNOWN['app/signin-required'];

const NETWORK = info(
    "We can't reach the server",
    'Your device could not connect to the showroom.',
    ['Check your Wi-Fi or mobile data.', 'Press Try again once you are back online.']
);

const DENIED = {
    admin: info(
        "Your account can't make this change",
        'Only administrator accounts can change the showroom.',
        ['Check that you are signed in with the admin account.', 'If you were only just made an admin, sign out and back in so the new permission loads.'],
        false
    ),
    request: info(
        "We couldn't accept this",
        'Your sign-in may have expired, or the request did not pass our security check.',
        ['Sign out and sign back in.', 'Then send the request again.']
    ),
    load: info(
        "We can't show the cars right now",
        'The showroom database refused the request.',
        ['Refresh the page.', 'If it keeps happening, the site owner needs to check the database rules.']
    ),
    requestLoad: info(
        "We can't show your requests right now",
        'The showroom database refused the request.',
        ['Refresh the page.', 'If it keeps happening, sign out and back in, then try again.']
    )
};

DENIED.booking = DENIED.request;

export function explainError(error, context = 'general') {
    const code = String(error?.code || '');
    const done = NOT_DONE[context] || NOT_DONE.general;

    if (error instanceof ValidationError) {
        return {
            kind: 'validation',
            retryable: false,
            technical: '',
            fields: error.fields,
            title: 'Please check the form',
            cause: 'A few details need fixing before we can continue:',
            steps: Object.values(error.fields)
        };
    }

    let found;
    if (code === 'app/signin-required' || code === 'unauthenticated') {
        found = KNOWN['app/signin-required'];
    } else if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        found = { ...NETWORK, title: "You're offline", cause: 'Your device is not connected to the internet.' };
    } else if (['unavailable', 'deadline-exceeded', 'auth/network-request-failed'].includes(code)) {
        found = NETWORK;
    } else if (code === 'permission-denied') {
        found = DENIED[context] || info(
            'This was not allowed',
            'Your account does not have permission to do this.',
            ['Sign out and back in, then try again.'],
            false
        );
    } else if (KNOWN[code]) {
        found = KNOWN[code];
    }

    if (found) {
        const keepOriginal = code === 'app/signin-required' || code === 'unauthenticated';
        return {
            kind: 'known',
            ...found,
            cause: keepOriginal ? found.cause : `${done} ${found.cause}`,
            technical: code
        };
    }

    return {
        kind: 'unknown',
        retryable: true,
        title: 'Something went wrong on our side',
        cause: `${done} This was not caused by anything you did.`,
        steps: ['Wait a moment and try again.', 'If it keeps happening, contact the showroom and mention the reference below.'],
        technical: code || String(error?.message || '')
    };
}

export function useAsyncAction({ context = 'general', minLoadingMs = 600, successMs = 0 } = {}) {
    const [state, setState] = useState({ status: 'idle', error: null, data: null });
    const timer = useRef(null);
    const alive = useRef(true);

    useEffect(() => {
        alive.current = true;
        return () => {
            alive.current = false;
            clearTimeout(timer.current);
        };
    }, []);

    const reset = useCallback(() => {
        clearTimeout(timer.current);
        setState({ status: 'idle', error: null, data: null });
    }, []);

    const fail = useCallback((error) => {
        clearTimeout(timer.current);
        setState({ status: 'error', error: explainError(error, context), data: null });
    }, [context]);

    const run = useCallback(async (task) => {
        clearTimeout(timer.current);
        setState({ status: 'loading', error: null, data: null });
        const started = Date.now();

        try {
            const data = await task();
            const wait = minLoadingMs - (Date.now() - started);
            if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
            if (!alive.current) return true;

            setState({ status: 'success', error: null, data: data ?? null });
            if (successMs) timer.current = setTimeout(reset, successMs);
            return true;
        } catch (error) {
            console.error(error);
            if (alive.current) setState({ status: 'error', error: explainError(error, context), data: null });
            return false;
        }
    }, [context, minLoadingMs, successMs, reset]);

    return { ...state, loading: state.status === 'loading', run, fail, reset };
}

export function Spinner({ label = 'Working' }) {
    return <span className="state-spinner" role="status" aria-label={label} />;
}

export function LoadingButton({ loading, loadingText = 'Saving...', children, className = '', ...rest }) {
    return (
        <button {...rest} className={className} disabled={loading || rest.disabled} aria-busy={loading}>
            {loading ? <><Spinner label={loadingText} /><span>{loadingText}</span></> : children}
        </button>
    );
}

export function SuccessState({ title, message, compact = false, children }) {
    return (
        <div className={`state-panel state-success${compact ? ' state-panel--compact' : ''}`} role="status">
            <svg className="state-tick" viewBox="0 0 52 52" aria-hidden="true">
                <circle className="state-tick__circle" cx="26" cy="26" r="24" fill="none" />
                <path className="state-tick__check" fill="none" d="M14 27l8 8 16-17" />
            </svg>
            <div className="state-body">
                <h3>{title}</h3>
                {message && <p>{message}</p>}
                {children}
            </div>
        </div>
    );
}

export function ErrorState({ error, onRetry, onDismiss, compact = false }) {
    if (!error) return null;

    return (
        <div className={`state-panel state-error${compact ? ' state-panel--compact' : ''}`} role="alert">
            <div className="state-icon" aria-hidden="true"><i className="fa-solid fa-triangle-exclamation" /></div>
            <div className="state-body">
                <h3>{error.title}</h3>
                <p>{error.cause}</p>
                {error.steps?.length > 0 && (
                    <ol className="state-steps">{error.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                )}
                <div className="state-actions">
                    {error.retryable && onRetry && <button type="button" className="btn btn-warning btn-sm" onClick={onRetry}>Try again</button>}
                    {onDismiss && <button type="button" className="btn btn-outline-light btn-sm" onClick={onDismiss}>Dismiss</button>}
                </div>
                {error.technical && (
                    <details className="state-tech">
                        <summary>Technical details for support</summary>
                        <code>{error.technical}</code>
                    </details>
                )}
            </div>
        </div>
    );
}

export function EmptyState({ icon = 'fa-car-side', title, message, action }) {
    let button = null;
    if (action?.to) button = <Link className="btn btn-warning" to={action.to}>{action.label}</Link>;
    else if (action?.href) button = <a className="btn btn-warning" href={action.href}>{action.label}</a>;
    else if (action?.onClick) button = <button type="button" className="btn btn-warning" onClick={action.onClick}>{action.label}</button>;

    return (
        <div className="state-panel state-empty" role="status">
            <div className="state-icon state-icon--muted" aria-hidden="true"><i className={`fa-solid ${icon}`} /></div>
            <h3>{title}</h3>
            {message && <p>{message}</p>}
            {button}
        </div>
    );
}

export function SkeletonGrid({ count = 12, columnClass = 'col' }) {
    return Array.from({ length: count }, (_, index) => (
        <div className={columnClass} key={index} aria-hidden="true">
            <div className="state-skeleton-card">
                <div className="state-skeleton-img" />
                <div className="state-skeleton-body">
                    <div className="state-skeleton-line state-skeleton-title" />
                    <div className="state-skeleton-line state-skeleton-price" />
                    <div className="state-skeleton-line state-skeleton-tag" />
                    <div className="state-skeleton-btn" />
                </div>
            </div>
        </div>
    ));
}
