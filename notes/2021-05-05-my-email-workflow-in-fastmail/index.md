---
title: "My email workflow in Fastmail"
unsplashImageId: k_EwsK_mCvk
updated: 2021-05-05
date: 2021-05-05
slug: my-email-workflow-in-fastmail
featured: true
tags:
  - productivity
---

I finally decided to switch from Hey email to a regular email provider. Elements of Hey's approach to email worked well for me, so I wanted to try to replicate some of it in another email provider.

After deciding to use Fastmail, I found several articles about setting up a Hey workflow with it. But the suggested setup relied on creating custom rules for each contact and I found this to be too cumbersome. I figured out a slightly different approach and wanted to share what I ended up with. 

## Why Fastmail?

[Fastmail](https://ref.fm/u26272200) came recommended by several friends and has a long history of providing a solid privacy concious service. Here’s what drew me to Fastmail:

* Privacy focused. It’s a paid service, which means they don’t need to sell your information to advertisers to make money. They also provide tracking pixel blocking and image proxying.
* It’s about half the price of Hey.
* Supports multiple custom domains.
* Decent iOS apps.

Check out this [more detailed comparison with Hey](https://www.fastmail.com/hey-fastmail/).

## The Workflow

After a little experimentation and playing with the settings, this is the workflow I’m now using with Fastmail:

1. Receive a new email from an unknown sender. The email lands in the `Screener` label.

2. Review the email and then either: 
    * Block the sender so any future emails go straight to the trash.
    * Add the sender to my contacts and then select which contact group it should belong to. “Feed” or “Paper Trail”. If I want to receive notifications I can make the contact a “VIP” contact.

3. Contacts in the Feed group land in the `Feed` label. Contacts in the 'Paper Trail' group land in the `Paper Trail` label. If a contact isn't in either group the email goes to the inbox.

This is working well so far and reflects what I liked about Hey's workflow.

## The Setup

The key to this workflow is using contacts and contact groups to filter incoming mail into various labels.

(Fastmail can organise emails using folders (one email, one folder) or labels (one email, many labels). For my purposes I’m using labels. This is configured in `Settings -> Preferences` under the `Labels` section.)

### 1. Feed & Paper Trail

First let's setup the Feed and Paper Trail groups and labels. Of course, you don't have to use these specific groups. If you find it useful to have different or more groups then you have the flexibility to add them.

1. Go to `Contacts` and tap `+` in the sidebar to create a new group. Create two groups called `Feed` and `Paper Trail`. 
2. Go to `Settings -> Filters & Rules` and tap `+ Create Rule`.
3. Select `Sender is a member of group...` and select `Feed` for the condition.
4. Tap `Continue`. 
5. Tap `Create Rule` next to the search box.
6. In the create rule drop down check the `Archive (remove Inbox label)` and `Add Label`. Create a new label called `Feed`.
7. Repeat steps 2-6 for `Paper Trail`.

![Your new Paper Trail/Feed rules should look like this](/notes/2021-05-05-my-email-workflow-in-fastmail/390B1DE4-1E76-4598-87BE-36B4E37B52DA.jpeg)

Once this is setup we can move on to setup the screener.

### 2. The Screener

Next we'll setup the Screener which will redirect any unknown senders to the `Screener` label. This is where we can review the emails and decide how we want to handle them in the future.

1. Go to `Settings -> Filters & Rules` and tap `+ Create Rule`. 
2. Select `Sender is not a contact` for the condition.
3. Tap `Continue`.
4. Tap `Create Rule` next to the search box.
5. In the create rule drop down check the `Archive (remove Inbox label)` and `Add Label`. Create a new label called `Screener`.

![Your new Screener rule should look like this](/notes/2021-05-05-my-email-workflow-in-fastmail/10B10E8D-B3F5-4FBC-BEF0-C419A3569372.jpeg)

At this point you'll be able to use the workflow I described above. But there are a few extra tweaks I made to improve the overall experience. 

### 3. Extras

#### Recycling old emails

For the `Feed` label I setup 'Auto Purging'. This means that emails with this label that are older than 31 days will be deleted. In Hey this is configured in the 'Recycling Center'. 

1. Go to `Settings -> Labels` and tap `Edit` on the label you want to setup auto-purging for.
2. Tap `Show advanced preferences`.
3. Check the option for `Auto-purge` and set the purge time to what ever you prefer.

#### Cleaner sidebar

By default the sidebar will include the usual list of folders (Inbox, All Mail, Sent, Spam, etc). I wanted a simplified sidebar with only what was important. Fortunately this is configurable in Fastmail via `Settings -> Labels`. You can configure labels to always be hidden, always show, or hide when empty.

In my sidebar I now have: 

* **Inbox** - always show.
* **Screener** - hide when empty.
* **Paper Trail** - always show.
* **Feed** - always show.

You can still navigate to other labels/folders by tapping `Find` at the bottom of the sidebar.

#### Notifications

I wanted to only receive emails from specific senders so that I’m not constantly receiving notifications for unimportant messages.

To do this I configure the Fastmail apps to only send notifications for VIP contacts. Then for the senders I want notifications from, I set them as VIP contacts.

#### Reply Later & Aside

I'm still figuring out the best approach for Hey's Reply Later and Aside feature. For now I use [pinned messages](https://www.fastmail.help/hc/en-us/articles/1500000280341-Marking-important-messages) as an alternative to Aside, and I use a label for Reply Later.

## Missing features in Fastmail

While I managed to replicate the core functionality of Hey in Fastmail, there are a couple UX things I miss from Hey that I'd love to see in Fastmail one day. 

### Feed view

In Hey, emails in the Feed are rendered in place making it feel more like, well, a feed. This allowed you to casually scroll through newsletters without having to open individual emails.

### Thread notifications

While you can mark individual contacts as VIP and get notifications from them in Fastmail, you can't get notifications for specific threads. This would allow you to follow a specific email chain without having to receive notifications for all messages from a sender.

### Contact avatars in email list

Several email apps, including Hey, will show a contact's avatar next to messages in email lists. As someone who works better with visual prompts (rather than pure text) this worked well to help me distingish between differnt types of emails, particulaly in the Paper Trail.

## Conclusion

Hey did a lot of things right and gave me a starting point for an email workflow that's a lot better than the inbox firehose of emails, or "smart" email sorting as seen in Gmail. Setting this up in Fastmail required a bit of work, and screening emails is not quite as fluid as in Hey, but it works well for me. Fastmail also offers much more flexibility to evolve your email workflow to suit you.

I'd love to hear how other folks like to optimize their email workflow. Comment below or shoot me a message via [email](mailto:hi@piet.me) or [twitter](https://twitter.com/pietvanzoen).

If you like the look of Fastmail and want to try it out, please use this [referal link](https://ref.fm/u26272200) to receive a 10% discount. 
