/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const results = await Promise.allSettled([
    prisma.books.createMany({
      data: [
        {
          title: "The Lord of the Rings",
          author: "J.R.R. Tolkien",
          stock: 1,
          code: "TLOTR01"
        },
        {
          title: "The Cronicle of Narnia",
          author: "C.S. Lewis",
          stock: 2,
          code: "TNARN01"
        },
        {
          title: "The Return of the King",
          author: "J.R.R. Tolkien",
          stock: 3,
          code: "TROTK01"
        },
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          stock: 1,
          code: "TH01"
        }
      ]
    }),
    prisma.members.createMany({
      data: [
        {
          name: "Faizal Ahmad",
          code: "F01",
          email: "fahmad@rmail.com"
        },
        {
          name: "Widia Rahma",
          code: "W01",
          email: "wrahma@rmail.com"
        },
        {
          name: "Arai Salman",
          code: "A01",
          email: "asalman@rmail.com"
        }
      ]
    })
  ])

  results.forEach((r, i) => {
    if (r.status = "fulfilled") {
      console.log(i + 1, ". Inserted data success. ", r);
    } else {
      console.error(i + 1, ". Inserted data failed. ", r);
    }
  })
}

main().then(() => prisma.$disconnect())

