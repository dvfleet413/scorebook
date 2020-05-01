# Scorebook

Scorebook is a Ruby on Rails API consumed by a Vanilla JS SPA frontend.  Users can use Scorebook to keep a traditional baseball scorecard while watching a game.  Scorecards can be persisted to the database with all associated records and accessed later.

## Installation Instructions

Fork and clone this repository. Run `bundle install` in the api directory.  Run `rails db:create` and `rails db:migrate` to set up database (requires PostgreSQL). To run the app locally, run `rails server` in the api directory and `npx reload` in the frontend directory.  Navigate to localhost:8080 for the frontend and localhost:3000 for the api.  

## Contributor's Guide

Bug reports and Pull Requests are welcomed on GitHub at [github.com/dvfleet413/scorebook](github.com/dvfleet413/scorebook).  