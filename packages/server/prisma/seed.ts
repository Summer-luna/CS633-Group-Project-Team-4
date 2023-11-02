import { PrismaClient } from '@prisma/client';
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
