 DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS books ( 
  id SERIAL PRIMARY KEY, 
  author VARCHAR(255),
  title VARCHAR(255),  
  isbn BIGINT,
  image_url TEXT,
  book_description TEXT,
  bookshelf VARCHAR(255)
);

INSERT INTO books (id, author, title, isbn, image_url, book_description, bookshelf) 
VALUES (
    1, 
  'China Mieville', 
  'Perdido Street Station', 
  9780345464521, 
  'http://books.google.com/books/content?id=Oh6wLFldgIwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 
'BONUS: This edition contains an excerpt from China Mieville’s Embassytown. Beneath the towering bleached ribs of a dead, ancient beast lies New Crobuzon, a squalid city where humans, Re-mades, and arcane races live in perpetual fear of Parliament and its brutal militia. The air and rivers are thick with factory pollutants and the strange effluents of alchemy, and the ghettos contain a vast mix of workers, artists, spies, junkies, and whores. In New Crobuzon, the unsavory deal is stranger to none—not even to Isaac, a brilliant scientist with a penchant for Crisis Theory. Isaac has spent a lifetime quietly carrying out his unique research. But when a half-bird, half-human creature known as the Garuda comes to him from afar, Isaac is faced with challenges he has never before fathomed. Though the Garuda''s request is scientifically daunting, Isaac is sparked by his own curiosity and an uncanny reverence for this curious stranger. While Isaac''s experiments for the Garuda turn into an obsession, one of his lab specimens demands attention: a brilliantly colored caterpillar that feeds on nothing but a hallucinatory drug and grows larger—and more consuming—by the day. What finally emerges from the silken cocoon will permeate every fiber of New Crobuzon—and not even the Ambassador of Hell will challenge the malignant terror it invokes . . . A magnificent fantasy rife with scientific splendor, magical intrigue, and wonderfully realized characters, told in a storytelling style in which Charles Dickens meets Neal Stephenson, Perdido Street Station offers an eerie, voluptuously crafted world that will plumb the depths of every reader''s imagination.', 
'Fantasy'
);

INSERT INTO books (id, author, title, isbn, image_url, book_description, bookshelf)
VALUES (
    2,
    'Orson Scott Card',
    'Ender''s Game',
    9781608872770,
    'http://books.google.com/books/content?id=EOVjmwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    'This engaging, collectible, miniature hardcover of the Orson Scott Card classic and worldwide bestselling novel, Ender''s Game, makes an excellent gift for anyone''s science fiction library. "“Ender''s Game is an affecting novel.""—New York Times Book Review Once again, Earth is under attack. An alien species is poised for a final assault. The survival of humanity depends on a military genius who can defeat the aliens. But who? Ender Wiggin. Brilliant. Ruthless. Cunning. A tactical and strategic master. And a child. Recruited for military training by the world government, Ender''s childhood ends the moment he enters his new home: Battle School. Among the elite recruits Ender proves himself to be a genius among geniuses. He excels in simulated war games. But is the pressure and loneliness taking its toll on Ender? Simulations are one thing. How will Ender perform in real combat conditions? After all, Battle School is just a game. Isn''t it?',
    'Sci-Fi'
);