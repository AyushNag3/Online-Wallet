import db from "@repo/db/client"
import bcrypt from "bcrypt"

async function main() {
    // Dummy user entry with balance
  const alice = await db.user.upsert({ // insert/create or update
    where: { number: '1111111111' },
    update: {},
    create: {
      number: '1111111111',
      password: await bcrypt.hash('alice',10) ,
      name: 'alice',
      Balance : {
       create : {
        amount : 20000,
        locked : 0
       }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await db.user.upsert({
    where: { number: '9999999998' },
    update: {},
    create: {
      number: '9999999998',
      password: await bcrypt.hash('bob',10) ,
      name: 'bob',
      Balance : {
        create : {
          amount : 2020 ,
          locked : 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })