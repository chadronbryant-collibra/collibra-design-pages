# Write your first guide in Claude

Bring a process you know, or try the made-up example below. You will leave with
an editable draft and a short list of questions for its process owner.

## Choose your setup

| You want to | Install |
| --- | --- |
| Write SOPs and task guides | The standalone collibra-sop skill |
| Also design, create, refine, simplify and review other work | The Collibra Design Suite plugin, which includes collibra-sop |

Choose one route to avoid installing the same SOP skill twice. The plugin is
instructions and references; Google account access comes from your connectors.

## Add the skill or plugin

Use your approved work Claude account. Download from the
[latest release](https://github.com/chadronbryant-collibra/collibra-design-pages/releases/latest).

For the full suite, upload **collibra-design-suite.zip** using the custom-plugin
upload option in **Customize → Plugins**. Enable the suite, then start a new
conversation. If your organization offers it directly, use that entry.

For SOP writing alone, open **Customize → Skills → + → Create skill → Upload a
skill**, upload **collibra-sop.zip**, and enable it. Skill use needs code execution
and file creation enabled; organization policy may control availability.

Ask: “Use collibra-sop to help me write a guide. Start by asking who it is for
and what task it should help them complete.” If the skill is missing, check
that it is enabled in the same account and open a new conversation.

[Claude skill help](https://support.claude.com/en/articles/12512180-use-skills-in-claude) ·
[Claude plugin help](https://support.claude.com/en/articles/13837440-use-plugins-in-claude)

## Connect your Google tools

In **Customize → Connectors**, find Google Drive, Google Docs, Google Slides and
Google Sheets. Connect using your work Google account and review the consent
screen. Drive handles discovery and file management; the other three connectors
provide native authoring. Check that the tools are enabled under the chat's
**+ → Connectors** menu. An organization owner may need to enable them first.

Paste the exact file link, or explicitly ask for a **Google Doc**, **Google
Slides deck** or **Google Sheet**. Without Google in the request, Claude may
return a downloadable file. Use “Open in Google” if the live pane is unavailable.
Your existing Google permissions still apply.

Embedded document images are not visible through text extraction. Check
screenshots and masking yourself. Slides has limitations, including adding
charts; verify the actual result instead of assuming every editor feature is
supported. [Google connector help](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors).

## Try a guided SOP

This exercise is made up and sets no company policy:

> Use collibra-sop to interview me about an internal guide for preparing a team
> workshop. Ask a few related questions at a time. I will provide the process;
> do not invent owners, deadlines or approval rules. Draft the supported steps
> and keep unresolved questions in this chat. After we agree the content,
> create a new Google Doc in the folder I select and return its link.

For the exercise, supply a simple process: the coordinator collects topics,
checks room availability, sends the agreed agenda and checks the room setup.
Add a branch: if a room is unavailable, the coordinator asks the organizer to
choose an online meeting or another date. Check that the branch survives the
rewrite. Ask Claude to explain which details it still needs.

## Improve an existing guide

Make a copy of a document you are allowed to use, then supply its link:

> Use collibra-sop to turn [Google Doc URL] into a clearer guide for [audience
> and region]. Read the relevant tabs. Preserve process conditions, links,
> tables and already-masked screenshots. Create a separate Google Doc draft in
> [selected folder]. Keep the source unchanged. Ask me about conflicting or
> outdated steps. Put questions in this chat, outside the reader's document.

Use your team's approved template or select a clean guide, a checklist where
completion tracking helps, or an ownership table where handoffs need explaining.
White pages and native headings are a useful starting point. Review the layout
and remove template instructions before using the draft.

For a shorter companion:

> From the confirmed main SOP at [URL], draft one Quick Task for [task]. Keep
> prerequisites, decisions and exceptions and link back to the main SOP. Tell
> me which sections it depends on. Do not publish it.

## Adapt an example into your own guide

> Use collibra-sop with this example structure:
> https://chadronbryant-collibra.github.io/collibra-design-pages/examples/documents/internal-sop.html
> Help me adapt it to [process] for [reader and region]. Ask for the current
> source, draft a useful first section, and keep its decisions and exceptions.
> Use the example's structure, not its example roles or policy. Continue with
> me until we have a separate editable Google Doc and a clear owner handoff.

## Improve screenshots and layout

> Review this Google Doc: [URL]. Work on a separate native copy if your tools
> support it. Map its tabs, actions and existing masked screenshots before
> editing. Keep each image next to the action it explains, with a useful caption
> and consistent readable sizing. Suggest an image only where it helps the
> reader complete a step. Ask me for that specific masked image, or finish the
> supported text if I do not have one. Tell me which pages or images you could
> actually inspect and give precise placement instructions for anything the
> connector cannot insert. Keep open questions in this chat.

Drive text extraction does not show embedded images. Native copying, image
insertion and layout checks depend on the tools available in the conversation;
ask Claude to check those capabilities instead of assuming they are all present.
Keep private screenshots private. Google access does not require making their
image URLs public. Check the connected account and the Google pane account if
an accessible file does not appear.

## Try Slides and Sheets too

**Slides:**

> Read this Google Slides deck: [URL]. Suggest a clearer story for slides 2–4.
> After I choose the direction, update a copy using the existing template.
> Preserve facts, charts and speaker notes. Return the Google Slides link and
> tell me what still needs a visual check.

**Sheets:**

> Create a new Google Sheet in my selected folder for a guide inventory. Use
> columns for title, audience, region, process owner, main SOP link and next
> review date. Add only these fictional guides: Workshop preparation and Room
> setup. Leave unknown owners and dates empty. Return the Google Sheet link.

The full suite also accepts “Refine this for colleagues” and “Review this guide
for clarity and accessibility.” The standalone SOP skill includes its own
writing and review workflow.

## Walk through it together

1. Confirm each person's work account, enabled skill and Google connectors.
2. Try the fictional guided interview and inspect the resulting document.
3. Choose one already-masked team source. Agree its audience and current process.
4. Create a separate draft and compare its conditions, links, screenshots and
   page layout with the source. Confirm the original is unchanged.
5. Have the process owner resolve gaps and choose the approved publication home.

Start with one guide. Agree the main SOP before adding Quick Tasks. Record where
the guide is used so a later change can be carried through. This workflow does
not automatically synchronize Docs, Confluence or an intranet.

If access is blocked, check the account and file permissions, then use your
organization's support route. If a write response is lost, inspect the existing
file before asking Claude to create it again.
