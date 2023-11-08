import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // insert Semester
  const semesterMockData = [
    {
      id: 0,
      name: 'fall'
    },
    {
      id: 1,
      name: 'spring'
    },
    {
      id: 2,
      name: 'summer'
    }
  ];

  const users = [
    {
      email: 'cxyue@bu.edu',
      password: '12345',
      lastName: 'Chen',
      firstName: 'Xinyue',
      buID: '1234567',
      role: 0
    },
    {
      email: 'ykxiong@bu.edu',
      password: '12345',
      lastName: 'Xiong',
      firstName: 'Yinkai',
      buID: '12345678',
      role: 0
    },
    {
      email: 'nelsonmo@bu.edu',
      password: '12345',
      lastName: 'Montesinos',
      firstName: 'Nelson',
      buID: '123456789',
      role: 0
    },
    {
      email: 'lyl1021@bu.edu',
      password: '12345',
      lastName: 'Li',
      firstName: 'Yilin',
      buID: '123456787',
      role: 0
    },
    {
      email: 'elentukh@bu.edu',
      password: '12345',
      lastName: 'Elentukh',
      firstName: 'Alex',
      buID: '1234567877',
      role: 1
    }
  ];

  // insert Users
  users.map(async (newUser) => {
    const SALT_ROUNDS = 15;
    const pwdHash = newUser.password ? await bcrypt.hash(newUser.password, SALT_ROUNDS) : null;

    await prisma.user.upsert({
      where: {
        email: newUser.email
      },
      create: {
        email: newUser.email,
        lastName: newUser.lastName,
        firstName: newUser.firstName,
        buID: newUser.buID,
        role: newUser.role,
        password: pwdHash
      },
      update: {
        lastName: newUser.lastName,
        firstName: newUser.firstName,
        buID: newUser.buID,
        role: newUser.role,
        password: pwdHash
      }
    });
  });

  semesterMockData.map(async (semester) => {
    await prisma.semester.upsert({
      create: semester,
      where: {
        id: semester.id
      },
      update: semester
    });
  });

  // insert AttendanceType
  const attendanceTypeMockData = [
    {
      id: 0,
      name: 'present'
    },
    {
      id: 1,
      name: 'absent'
    },
    {
      id: 2,
      name: 'excused'
    }
  ];

  attendanceTypeMockData.map(async (attendanceType) => {
    await prisma.attendanceType.upsert({
      create: attendanceType,
      where: {
        id: attendanceType.id
      },
      update: attendanceType
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
