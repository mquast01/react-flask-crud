CREATE TABLE [IF NOT EXISTS] [test].users (
	Name TEXT NOT NULL,
   	Id INTEGER NOT NULL PRIMARY KEY UNIQUE,
	Points INTEGER DEFAULT 0,
);