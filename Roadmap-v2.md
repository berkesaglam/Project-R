# PROJECT R — V2.0 ROADMAP

## Goal

Turn Project R into a shared, secure, mobile-friendly couple app with synchronized data across both users' devices.

## Sprint 1 — Project Preparation
- [x] Preserve the stable v1.0 branch
- [x] Create the `develop-v2.0` branch
- [x] Fix README conflict markers
- [x] Create `Roadmap-v2.md`
- [ ] Review architecture and security requirements

## Sprint 2 — Backend Foundation
- [ ] Configure Supabase project
- [ ] Configure frontend environment settings
- [ ] Establish safe client configuration
- [ ] Verify connectivity

## Sprint 3 — Database, Authentication and Permissions
- [ ] Design shared-space data model
- [ ] Configure authentication for both users
- [ ] Add database tables and relationships
- [ ] Configure Row Level Security (RLS)
- [ ] Restrict relationship-counter controls to Berke
- [ ] Prepare photo-storage access policies

## Sprint 4 — Shared Bucket List
- [ ] Add items
- [ ] Delete items
- [ ] Mark items complete
- [ ] Record completion date and contributor

## Sprint 5 — Bucket List Synchronization
- [ ] Synchronize changes across devices
- [ ] Add loading, empty and error states
- [ ] Test simultaneous updates

## Sprint 6 — Film & Series
- [ ] Add shared recommendations
- [ ] Track who added each item
- [ ] Mark items as watched
- [ ] Record watched dates

## Sprint 7 — Private Notes
- [ ] Send notes between users
- [ ] Track sender and date
- [ ] Track read/unread status
- [ ] Show unread indicator

## Sprint 8 — Couple Activities
- [ ] Create activity and conversation prompts
- [ ] Add random selection
- [ ] Add reroll functionality

## Sprint 9 — Quiz Question Pool
- [ ] Prepare 100 questions
- [ ] Add multiple-choice answers
- [ ] Validate correct answers

## Sprint 10 — Quiz Engine
- [ ] Select 10 random questions per play
- [ ] Calculate scores out of 10
- [ ] Display results and feedback

## Sprint 11 — Quiz History
- [ ] Save quiz attempts
- [ ] Track high score and average
- [ ] Track total plays

## Sprint 12 — Usage Analytics Backend
- [ ] Record relevant app events
- [ ] Track events from both users
- [ ] Store timestamps and event details

## Sprint 13 — Analytics Dashboard
- [ ] Show app opens and section visits
- [ ] Show Bucket List and Film & Series activity
- [ ] Show note and quiz activity
- [ ] Show activity history

## Sprint 14 — Visual Redesign and Counter Controls
- [ ] Implement night-sky theme
- [ ] Improve mobile layout and animations
- [ ] Add relationship-counter pause/resume controls
- [ ] Implement the agreed counter date behavior
- [ ] Build photo-album interface

## Sprint 15 — Security Review
- [ ] Review authentication and authorization
- [ ] Verify database and storage policies
- [ ] Validate user input
- [ ] Ensure secret keys are not exposed

## Sprint 16 — Photo Album and Integration Tests
- [ ] Upload original-quality photos
- [ ] Store captions and dates
- [ ] Display shared photos on both devices
- [ ] Test all major features on two devices
- [ ] Test counter behavior and permissions

## Sprint 17 — Production Deployment
- [ ] Configure production services
- [ ] Apply database migrations and policies
- [ ] Deploy the frontend
- [ ] Verify production authentication and storage

## Sprint 18 — Release v2.0
- [ ] Complete regression tests
- [ ] Verify mobile and PWA behavior
- [ ] Review security and error handling
- [ ] Document the release

## Rules
- Keep `main` reserved for stable releases.
- Develop v2.0 on `develop-v2.0`.
- Never commit Supabase secret or service-role keys.
- Do not mark a sprint complete until its work has been tested.
