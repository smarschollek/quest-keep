ALTER TABLE "places" RENAME COLUMN "creator_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "quests" RENAME COLUMN "creator_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "places" DROP CONSTRAINT "places_creator_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "quests" DROP CONSTRAINT "quests_creator_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "places" ADD CONSTRAINT "places_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quests" ADD CONSTRAINT "quests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
