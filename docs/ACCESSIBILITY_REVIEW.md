# Accessibility review — 13 October 2026

Scope: source inspection and automated regression checks, not a full screen-reader or real-browser keyboard certification.

| Manual check | Source evidence / action |
| --- | --- |
| Keyboard-focusable controls | Native links, buttons, inputs, summaries; no positive tabindex. Global focus-visible outline added. |
| Purpose and state | Icon controls labelled; navigation expanded/controls, active NavLink, native details state, input invalid state. |
| Logical tab order | DOM order used. Mobile menu closes when focus leaves it. |
| Visual and DOM order | Reviewed shared navigation, FAQ, form and layout; no intentional CSS reordering in those controls. All responsive layouts still need browser review. |
| No accidental focus trap | Privacy dialog has an intentional modal Tab loop. Added Escape and a close button even on first visit, without enabling analytics. Fixed reverse Tab from dialog container. |
| Focus on new content | Form focuses errors and success; modal receives and restores focus. Route change now waits for lazy main landmark before focusing it. |
| Landmarks | header/nav/main/footer and skip link are present. |
| Offscreen content | Mobile navigation and privacy details use hidden; modal background uses inert and aria-hidden; dialog visibility controlled by CSS. |
| Associated labels | FormField labels, message label, and icon-only control names present. |
| Roles | Native semantics preferred; modal dialog/aria-modal, form status/alerts and loading status present. |

Remaining manual verification: desktop/mobile Tab and Shift+Tab sequences, focus visibility in both themes, responsive visual/DOM correspondence, real screen-reader announcements and external Turnstile iframe. Existing tests do not certify these points end to end. No contact messages were sent.
