import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { videos } from '@/lib/videoStore';

export async function POST(request: NextRequest) {
  try {
    const { niche, topic, duration, tone } = await request.json();

    // Generate AI script
    const script = generateScript(niche, topic, duration, tone);
    const title = generateTitle(topic, niche);
    const description = generateDescription(topic, niche);
    const tags = generateTags(niche, topic);
    const thumbnailIdeas = generateThumbnailIdeas(topic);

    const video = {
      id: uuidv4(),
      niche,
      topic,
      duration,
      tone,
      status: 'ready',
      createdAt: new Date().toISOString(),
      script,
      title,
      description,
      tags,
      thumbnailIdeas,
    };

    videos.push(video);

    return NextResponse.json({ success: true, video });
  } catch (error) {
    console.error('Error generating video:', error);
    return NextResponse.json({ error: 'Failed to generate video' }, { status: 500 });
  }
}

function generateScript(niche: string, topic: string, duration: string, tone: string): string {
  const hooks = [
    "What if I told you that everything you know about this topic is about to change?",
    "Today, we're diving into something that will blow your mind.",
    "This is the information they don't want you to know about.",
    "You won't believe what I discovered about this topic.",
    "If you've been wondering about this, you're in the right place.",
  ];

  const hook = hooks[Math.floor(Math.random() * hooks.length)];

  return `[INTRO]
${hook}

Hey everyone, and welcome back to the channel! Today we're talking about ${topic}. If you're interested in ${niche.toLowerCase()}, you're going to want to stick around for this one.

Before we dive in, make sure to hit that subscribe button and turn on notifications so you never miss out on our latest content.

[MAIN CONTENT - SECTION 1]
Let's start by breaking down the fundamentals. When it comes to ${topic}, there are several key things you need to understand.

First, it's important to recognize that this isn't just a passing trend. This is something that's reshaping the entire landscape of ${niche.toLowerCase()}.

[MAIN CONTENT - SECTION 2]
Now, here's where things get really interesting. The data shows some fascinating patterns that most people completely overlook.

Let me walk you through the three most important aspects:

Number one: The foundation. This is crucial because without understanding this, everything else falls apart.

Number two: The application. This is where theory meets practice, and where you'll see real results.

Number three: The future implications. This is what separates those who just consume content from those who actually implement it.

[MAIN CONTENT - SECTION 3]
But here's what nobody talks about - the hidden challenges that come with ${topic}.

I've done extensive research on this, and the findings are remarkable. Most people focus on the obvious factors, but the real game-changers are happening beneath the surface.

[CONCLUSION]
So there you have it - everything you need to know about ${topic}.

If you found this valuable, give this video a thumbs up and let me know in the comments what you think about this.

And hey, if you want to dive deeper into ${niche.toLowerCase()}, check out the video I'm putting in the description. It's going to take your understanding to the next level.

Thanks for watching, and I'll see you in the next one!

[END SCREEN]
Don't forget to subscribe for more ${niche.toLowerCase()} content!`;
}

function generateTitle(topic: string, niche: string): string {
  const templates = [
    `${topic} - Everything You Need to Know in 2024`,
    `The Truth About ${topic} (Nobody Talks About This)`,
    `${topic}: Complete Guide for Beginners`,
    `Why ${topic} is Changing ${niche} Forever`,
    `${topic} Explained - The Ultimate Breakdown`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateDescription(topic: string, niche: string): string {
  return `In this video, we dive deep into ${topic} and uncover everything you need to know. Whether you're a beginner or already familiar with ${niche.toLowerCase()}, this comprehensive guide will give you valuable insights.

🔔 Subscribe for more ${niche.toLowerCase()} content!

📌 Timestamps:
0:00 - Introduction
0:30 - Key Concepts
2:15 - Deep Dive Analysis
5:45 - Practical Applications
8:30 - Final Thoughts

💡 Related Videos:
[Link to related content]

📱 Follow us on social media:
[Social media links]

#${topic.replace(/\s+/g, '')} #${niche.replace(/\s+/g, '')} #YouTube

---
Disclaimer: This content is for educational and informational purposes only.`;
}

function generateTags(niche: string, topic: string): string[] {
  const commonTags = [
    niche.toLowerCase().replace(/\s+/g, ''),
    topic.toLowerCase().replace(/\s+/g, ''),
    'educational',
    'tutorial',
    '2024',
    'howto',
    'guide',
    'explained',
  ];

  return commonTags.slice(0, 15);
}

function generateThumbnailIdeas(topic: string): string[] {
  return [
    `Bold text: "${topic}" with shocked face emoji background`,
    `Split screen: "Before" vs "After" with contrasting colors (red/green)`,
    `Large arrow pointing to key visual element with yellow highlight`,
    `Number-focused: "Top 5" or "10 Facts" in large bold numbers`,
    `Question format: "Is ${topic} Worth It?" with question mark graphic`,
  ];
}
