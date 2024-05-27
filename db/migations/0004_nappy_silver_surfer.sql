CREATE TABLE IF NOT EXISTS "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"info" text,
	"user_id" serial NOT NULL
);
--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "creator_id" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "places" ADD CONSTRAINT "places_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
