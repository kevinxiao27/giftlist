# SwiftGift


## Inspiration

Have you ever struggled with gift shopping? So have we. We made SwiftGift to solve the uncertainty and time spent when finding "the perfect gift".

## What it does

Swift gift takes a user's prompted gift interests and will recommend gifts for their them to buy, which the user can provide feedback for by swiping left or right.

## How we built it

We built a RESTFUL API using express and mongoose in the backend, and from a schema created to house the information of interests in gifts, we would query a prompt to OpenAI to generate some gift recommendations. We would then parse this and return a json object for the frontend to receive.

The frontend was developed using Next.js, and would fetch the information from the backend and also query some related images to a gift name in order to display tinder like cards.

## Challenges we ran into

Cors errors and figuring out how to use new apis and frameworks led to some blocks. For example deploying the backend to Vercel caused runtime errors and timeouts, which we eventually had to debug and realize was because of the ip configuration of the database.

## Accomplishments that we're proud of

Restructuring our format from having the AI generate prompts that the recipient might like for the gift giver to a different model that generates products that is for the gift recipient to provide their feedback to ensure that it is a gift that they will enjoy. Additionally, with only one software developer and one person working on the case, we were proud of the quality of work we were able to produce.

## What we learned

In this project we learned how to work together as a team and implement ideas from a business model and also from a technical perspective, towards the end goal of building a product with impact

## What's next for Swift Gift

Phones are portable. Access SwiftGift on the go!
‘GiftSwipe’ feature is easier with a handheld device.
Create 'group events' with other SwiftGift users to see what they're gifting the recipient.
No more risk of buying the same gift!
‘Average gift price’ feature provides a guideline for gifters.

ProduHacks 2024 Submission
