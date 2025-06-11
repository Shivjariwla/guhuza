const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.level.upsert({
        where: { Level_Id: 1 },
        update: {},
        create: {
            Level_Id: 1,
            Level_Title: 'Novice',
            Level_number: 1
        }
    });

    await prisma.milestone.upsert({
        where: { Milestone_Id: 1 },
        update: {},
        create: {
            Milestone_Id: 1,
            Milestone_Title: 'First Login',
            Milestone_description: 'Reward for logging in.',
            UnlockingLevel: 1,
            Milestone_reward_message: '🎉 Congrats!',
            Milestone_Link: '/profile',
            Milestone_Button_CTA: 'Go to Profile'
        }
    });

    console.log("✅ Seed complete");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
