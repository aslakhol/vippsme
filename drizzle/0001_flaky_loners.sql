CREATE TABLE IF NOT EXISTS "new_link" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(256) NOT NULL,
	"clicks" integer DEFAULT 0,
	"phone" varchar(256) NOT NULL,
	"message" varchar(256),
	"amount" integer,
	"vipps" varchar(256) NOT NULL,
	"http" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "new_link_slug_unique" UNIQUE("slug")
);
