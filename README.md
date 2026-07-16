Final Deployment Roadmap
MongoDB Atlas          ✅
Render                 ✅
Vercel                 ✅
React Router           ✅
Authentication         🔄
JWT                    ⏳
bcrypt                 ⏳
Protected Routes       ⏳
Logout                 ⏳
Environment Variables  ⏳
Custom Domain          ⏳
HTTPS                  ⏳
PM2                    ⏳
Docker                 ⏳
CI/CD                  ⏳
AWS Basics             ⏳




# MongoDB Atlas

## Why MongoDB Atlas?

Initially I had two options.

1. Install MongoDB locally.
2. Use MongoDB Atlas.

I selected MongoDB Atlas because:

• No need to install MongoDB locally.
• Database remains online.
• Can be connected directly with Render.
• Easy deployment.
• Free cluster is sufficient for learning projects.

--------------------------------------------------------

## Creating MongoDB Atlas Account

1. Created account using Google.
2. Created a free cluster.
3. Selected M0 Free Tier.
4. Region selected ...
5. Cluster Name ...
6. Waited until cluster became active.

--------------------------------------------------------

## Creating Database User

Database cannot be accessed without authentication.

Created

Username

deployment_user

Password

********

Role

Atlas Admin

--------------------------------------------------------

## Network Access

Initially Atlas blocks every IP.

Therefore

Network Access

↓

Add IP Address

↓

0.0.0.0/0

Meaning

Allow connection from every IP.

Why?

Because Render servers have dynamic IP addresses.

If only localhost IP is allowed,

Render cannot connect.

--------------------------------------------------------

## Connection String

Atlas provided

mongodb+srv://deployment_user:password@digitallearning.7fm99lp.mongodb.net/?retryWrites=true&w=majority

Explanation

mongodb+srv

↓

Uses DNS SRV Record.

deployment_user

↓

Database Username.

password

↓

Database Password.

digitallearning

↓

Cluster Name.

mongodb.net

↓

MongoDB Atlas Domain.

--------------------------------------------------------

## Why deploymentProject was added?

Initially

mongodb.net/?retryWrites=true

No database name.

MongoDB automatically used

test

database.

Therefore all users were saved inside

test.users

Instead of

deploymentProject.users

Solution

Changed URI

mongodb.net/deploymentProject?retryWrites=true...

Now Mongoose knows

Database Name

↓

deploymentProject

Collection

↓

users

--------------------------------------------------------

## Important Learning

If database name is omitted,

MongoDB automatically creates

test

database.

This was one of the biggest mistakes during deployment.


Production Request Flow

User
   ↓
https://deployment-project-seven.vercel.app
   ↓
Axios Request
   ↓
https://deployment-project-yxly.onrender.com
   ↓
Express
   ↓
MongoDB Atlas
   ↓
Response
   ↓
React UI Updated
