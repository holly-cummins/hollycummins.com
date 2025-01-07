---
author: holly cummins
title: "Java Annoted Featured Content – The Long Version"
category: java
type: blog
cover: java-annotated-page.jpg
---

I’m a [JetBrains Community Contributor](https://www.jetbrains.com/lp/jetbrains-community-contributor/), and I was honoured to be invited to provide featured content for the [Java Annotated](https://www.jetbrains.com/lp/jam/) newsletter. A week before it was due, I had a blank page. And then the day before it was due, I had a blank page. The day it was due, I had been thinking really hard, and had … a blank page with a few scraps of links. So I continued working on it. At some point, near the end of the day it was due, I reached out to the JetBrains team to ask how long it should be. “Oh, a paragraph or two” was the answer. “So, uh, eight paragraphs would be too much?” Yes. Yes, it seemed it would. Apparently, that’s what my own blog is for. 

So, because I don’t like throwing things out, please enjoy the full, with-lots-of-extra-thoughts, version of the Java Annotated Monthly Featured content. Or, if you prefer the short version, it’s coming soon [on the JetBrains site](https://blog.jetbrains.com/idea/2024/04/java-annotated-monthly-may-2024/).

This past month, I’ve been enjoying the new [full line code completion](https://www.jetbrains.com/help/idea/full-line-code-completion.html). There’s a lot of things to like about it; the feature is included in my existing IntelliJ IDEA Ultimate subscription, it runs locally, is privacy-friendly, is integrated into my existing tools, and it solves a real problem (typing is boring).

We’re in the midst of a full-on AI hype cycle at the moment. Last summer, Gartner announced that [we had reached the peak of inflated expectations](https://web.archive.org/web/20230816114302/https://www.gartner.com/en/newsroom/press-releases/2023-08-16-gartner-places-generative-ai-on-the-peak-of-inflated-expectations-on-the-2023-hype-cycle-for-emerging-technologies). Right now, many of us are flip-flopping back and forth between excitement and cynicism as we slide back down the hype curve. The potential of these tools is enormous, but so many of them promise a lot, and deliver … errors. And, if you look at the actual cost of training and running the larger models, it’s eye-wateringly, jaw-droppingly, horrifyingly, enormous.

There’s another problem with AI, which affects me personally. AI development all about Python, and I just don’t do Python. I’ve been a Java developer my whole career, and I quite like the idea of keeping it that way. If Python is the language of AI, does that mean us Java developers can ignore AI until we reach the trough of disillusionment, and after that don’t need to worry about it any more? Does it mean us Java developers are _excluded_ from AI, whether we like it or not?

No. AI isn’t going away, but we’re starting to get a better understanding of where it’s useful and where it isn’t. Molly White, of [web3isgoinggreat](https://www.web3isgoinggreat.com/) fame, has just published a fantastic piece called [“AI Isn’t Useless”](https://www.citationneeded.news/ai-isnt-useless/). I also wrote on my blog last month about the big question of [whether AI will take developer jobs](https://hollycummins.com/will-ai-take-our-jobs/).

And AI is opening up to Java developers. This isn’t just AI-powered Java coding assistants; us Java developers can now _create_ AI tools. [LangChain4j](https://github.com/langchain4j/langchain4j) simplifies integrating machine learning into Java applications. The Quarkus team have applied the Quarkus principle of [developer joy](https://quarkus.io/developer-joy/) to their [Langchain4j integration](https://quarkus.io/blog/quarkus-meets-langchain4j/), so it’s really nice. Last month, they released an [Easy RAG](https://docs.quarkiverse.io/quarkus-langchain4j/dev/easy-rag.html) extension, which allows you to set up a Retrieval Augmented Generation (RAG) application with just a single piece of configuration. You tell the `easy-rag` extension what directory your documents (PDF, Word files, etc) are in, and it will ingest them, decode them, and use them to teach itself. This makes it way more useful than a generic LLM, because it means the model has knowledge of the domain-specific things that you care about. I chat to some of my Quarkus colleagues about the Quarkus + LangChain4j in [the latest episode of Quarkus Insights](https://www.youtube.com/watch?v=EeR_8HMFwN4). 

Another course-correction that I’m excited about is the revival of symbolic reasoning (that is, rules). We’re going to start talking more about combining large language models with symbolic reasoning. Rules engines are cheap to execute, easier to reason about, and reassuringly correct. Mario Fusco did a talk at Devoxx Greece about how LLMs and symbolic reasoning are complementary. The video isn’t out yet, although it might have appeared on [the Devoxx YouTube channel](https://www.youtube.com/@DevoxxForever) by the time you read this. In the meantime, he’s prepared several sample applications, including [an airline chatbot](https://github.com/mariofusco/quarkus-drools-llm?tab=readme-ov-file#the-airline-chatbot-example). He’s also got nice explanation of why symbolic reasoning is important in the [readme](https://github.com/mariofusco/quarkus-drools-llm). I think we’ll be seeing more of this kind of hybrid approach in the future, as our industry matures in how we use LLMs.

Being able to leverage AI from Java is important, because Java is getting better and better. One JVM improvement I’m excited about is project Leyden. Leyden isn’t news, but we’re seeing a nice stream of news and JEPs. Per-Åke Minborg from Oracle gave a nice Leyden updateat this year’s Jfokus. Both the [slides](https://www.jfokus.se/jfokus24-preso/Project-Leyden--Capturing-Lightning-in-a-Bottle.pdf) and [video](https://www.youtube.com/watch?v=CeO9RaJhjxg) are now available. 

Leyden is part of a general movement to make Java start faster and run leaner. Historically, JVMs were optimised for dynamism. You could completely change the behaviour and dependencies of your application without stopping it. This is very clever engineering, but dynamism has a cost, and a highly dynamic runtime in a container is pointless. Even outside a container, realistically, most of us would (and should!) prefer to manage production updates through a CI/CD pipeline rather than patches to a live server. The good news is that Java is evolving, to reduce repeated work and unecessary classloading. Leyden is part of a bigger (and exciting!) trend of technologies to make Java start faster and run leaner, which also includes GraalVM, CRaC, and [Quarkus](http://quarkus.io).