import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Fiction' } }),
    prisma.category.create({ data: { name: 'Non-Fiction' } }),
    prisma.category.create({ data: { name: 'Science Fiction' } }),
    prisma.category.create({ data: { name: 'Mystery' } }),
    prisma.category.create({ data: { name: 'Biography' } }),
    prisma.category.create({ data: { name: 'Technology' } }),
    prisma.category.create({ data: { name: 'History' } }),
  ]);

  // Create users
  await prisma.user.createMany({
    data: [
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Robert Johnson' },
      { name: 'Maria Garcia' },
      { name: 'David Chen' },
      { name: 'Sarah Wilson' },
      { name: 'Michael Brown' },
      { name: 'Emma Davis' },
      { name: 'James Miller' },
      { name: 'Lisa Anderson' },
      { name: 'Thomas Taylor' },
      { name: 'Patricia Martin' },
      { name: 'Christopher Lee' },
      { name: 'Jennifer White' },
      { name: 'William Turner' },
    ],
  });

  // Create books
  await prisma.book.createMany({
    data: [
      // Fiction
      {
        title: '1984',
        publishYear: '1949',
        writer: 'George Orwell',
        description: 'A dystopian novel about totalitarianism',
        categoryId: categories[0].id,
      },
      {
        title: 'To Kill a Mockingbird',
        publishYear: '1960',
        writer: 'Harper Lee',
        description: 'A novel about justice and racism in the American South',
        categoryId: categories[0].id,
      },
      {
        title: 'Pride and Prejudice',
        publishYear: '1813',
        writer: 'Jane Austen',
        description: 'A romantic novel about manners and marriage',
        categoryId: categories[0].id,
      },
      // Science Fiction
      {
        title: 'Dune',
        publishYear: '1965',
        writer: 'Frank Herbert',
        description: 'An epic science fiction novel',
        categoryId: categories[2].id,
      },
      {
        title: 'Foundation',
        publishYear: '1951',
        writer: 'Isaac Asimov',
        description: 'A science fiction novel about the decline and rebirth of civilization',
        categoryId: categories[2].id,
      },
      // Mystery
      {
        title: 'The Da Vinci Code',
        publishYear: '2003',
        writer: 'Dan Brown',
        description: 'A mystery thriller novel',
        categoryId: categories[3].id,
      },
      {
        title: 'Gone Girl',
        publishYear: '2012',
        writer: 'Gillian Flynn',
        description: 'A psychological thriller',
        categoryId: categories[3].id,
      },
      // Non-Fiction
      {
        title: 'A Brief History of Time',
        publishYear: '1988',
        writer: 'Stephen Hawking',
        description: 'A book about modern physics for general readers',
        categoryId: categories[1].id,
      },
      {
        title: 'Sapiens',
        publishYear: '2011',
        writer: 'Yuval Noah Harari',
        description: 'A brief history of humankind',
        categoryId: categories[1].id,
      },
      // Biography
      {
        title: 'Steve Jobs',
        publishYear: '2011',
        writer: 'Walter Isaacson',
        description: 'The biography of Apple\'s founder',
        categoryId: categories[4].id,
      },
      {
        title: 'The Diary of a Young Girl',
        publishYear: '1947',
        writer: 'Anne Frank',
        description: 'Personal writings from the Holocaust',
        categoryId: categories[4].id,
      },
      // Technology
      {
        title: 'Clean Code',
        publishYear: '2008',
        writer: 'Robert C. Martin',
        description: 'A handbook of agile software craftsmanship',
        categoryId: categories[5].id,
      },
      {
        title: 'The Pragmatic Programmer',
        publishYear: '1999',
        writer: 'Andrew Hunt',
        description: 'From journeyman to master',
        categoryId: categories[5].id,
      },
      // History
      {
        title: 'Guns, Germs, and Steel',
        publishYear: '1997',
        writer: 'Jared Diamond',
        description: 'The fates of human societies',
        categoryId: categories[6].id,
      },
      {
        title: 'The Art of War',
        publishYear: '-500',
        writer: 'Sun Tzu',
        description: 'Ancient Chinese military treatise',
        categoryId: categories[6].id,
      },
      // Additional Fiction Books
      {
        title: 'The Great Gatsby',
        publishYear: '1925',
        writer: 'F. Scott Fitzgerald',
        description: 'A novel about the American Dream',
        categoryId: categories[0].id,
      },
      {
        title: 'One Hundred Years of Solitude',
        publishYear: '1967',
        writer: 'Gabriel García Márquez',
        description: 'A masterpiece of magical realism',
        categoryId: categories[0].id,
      },
      // Additional Science Fiction
      {
        title: 'Neuromancer',
        publishYear: '1984',
        writer: 'William Gibson',
        description: 'A pioneering cyberpunk novel',
        categoryId: categories[2].id,
      },
      // Additional Mystery
      {
        title: 'The Girl with the Dragon Tattoo',
        publishYear: '2005',
        writer: 'Stieg Larsson',
        description: 'A crime thriller novel',
        categoryId: categories[3].id,
      },
      // Additional Non-Fiction
      {
        title: 'Thinking, Fast and Slow',
        publishYear: '2011',
        writer: 'Daniel Kahneman',
        description: 'A book about decision-making',
        categoryId: categories[1].id,
      },
      // Additional Biography
      {
        title: 'Long Walk to Freedom',
        publishYear: '1994',
        writer: 'Nelson Mandela',
        description: 'The autobiography of Nelson Mandela',
        categoryId: categories[4].id,
      },
      // Additional Technology
      {
        title: 'Design Patterns',
        publishYear: '1994',
        writer: 'Gang of Four',
        description: 'Elements of Reusable Object-Oriented Software',
        categoryId: categories[5].id,
      },
      // Additional History
      {
        title: 'SPQR: A History of Ancient Rome',
        publishYear: '2015',
        writer: 'Mary Beard',
        description: 'A comprehensive history of Rome',
        categoryId: categories[6].id,
      },
      {
        title: 'The Rise and Fall of the Third Reich',
        publishYear: '1960',
        writer: 'William L. Shirer',
        description: 'A history of Nazi Germany',
        categoryId: categories[6].id,
      },
      {
        title: 'Team of Rivals',
        publishYear: '2005',
        writer: 'Doris Kearns Goodwin',
        description: 'Political genius of Abraham Lincoln',
        categoryId: categories[6].id,
      },
      {
        title: 'The Innovators',
        publishYear: '2014',
        writer: 'Walter Isaacson',
        description: 'How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution',
        categoryId: categories[5].id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 