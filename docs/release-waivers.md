# Release waivers

A human may waive a release-review **check** (never a gate) here. The review reports a
waived check as WAIVED with a pointer to its entry. A waiver covers only the version it
names. Agents never write this file.

## 0.1.0

| Check | Components | Reason | Decided by | Date |
|---|---|---|---|---|
| 6 · No overlap | ButtonDestructive, ButtonInfo | They borrow the Button page's rules on purpose: Figma has no page of their own for them, so their `use_when` text matches. | Yin Myo Su | 2026-10-21 |
| 6 · No overlap | Loading, ProgressLoadingMobile, ProgressLoadingWebsite | Figma does not say how they differ; Mobile and Website differ only by platform, so their generic lines match. To be fixed with a Figma page before 1.0. | Yin Myo Su | 2026-10-21 |
