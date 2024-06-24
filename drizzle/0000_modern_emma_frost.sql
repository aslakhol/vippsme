CREATE TABLE IF NOT EXISTS "vippsme_link" (
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
	CONSTRAINT "vippsme_link_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vippsme_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "vippsme_post" ("name");