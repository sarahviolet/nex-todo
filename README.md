# 📝 NexToDo

NexToDo is a **full-stack web application** designed to manage to-do tasks by date, time of day, priority, and type.  
Built with Next.js and Express.js, the goal is to deliver a clean user interface and a maintainable project structure.


## 🚀 Live Demo

🔗 [Live Demo](https://.com)


## 🛠 Tech Stack

| Category      | Technologies                              |
|---------------|-------------------------------------------|
| Frontend      | Next.js 15, TypeScript, Tailwind CSS      |
| Backend       | Express.js, TypeScript                    |
| Database      | PostgreSQL + Prisma ORM                   |
| Tools         | Postman, pgAdmin, GitHub, pnpm            |


## 🌟 Features

- ✅ Create tasks (with title, date, time of day, priority, and type)
- ✅ View all tasks
- ✅ Edit tasks
- ✅ Delete tasks
- ✅ Toggle task completion (checkbox)
- 💄 Custom pastel-tone themed UI
- 🛠 First version deployed with essential features



## ⏳ Upcoming Features

- 🔍 Search tasks (by title or description)
- 🗂 Filter tasks (by date, time, priority, etc.)
- 🔄 Drag & drop to reorder tasks
- 🌑 Dark mode
- 📄 Task detail page (`/todos/:id`)


## 📂 Project Structure

nex-todo/
├── frontend/              # Next.js 15 + TypeScript + Tailwind
│   ├── app/               # page.tsx, layout.tsx
│   ├── lib/
│   └── globals.css
│
├── backend/               # Express.js + TypeScript + Prisma
│   ├── src/                  
│   └── prisma/               
│
├── .env
├── README.md
└── Other config files  # tailwind.config.ts, postcss.config.js, etc.


## 📦 Installation & Run

bash
# Clone the project
git clone https://github.com/your-username/nex-todo.git
cd nex-todo

# Backend setup
cd backend
pnpm install
npx prisma generate
npx prisma migrate dev --name init
npx tsx src/server.ts

# Frontend setup
cd ../frontend
pnpm install
pnpm dev


👩‍💻 Developer Info
Developer: Sarah Yun
Email: sarah.yun.swengineer@gmail.com

🧡 License
MIT License
Feel free to fork, use, and modify this project.



# 📝 NexToDo

NexToDo는 할 일(To-Do)을 날짜, 시간대, 우선순위, 유형별로 관리할 수 있는 **풀스택 웹 애플리케이션**입니다.  
Next.js와 Express.js를 기반으로 만들어졌으며, 깔끔한 UI와 지속 가능한 구조를 목표로 개발되었습니다.


## 🚀 배포 링크

🔗 [Live Demo 바로가기](https://.)


## 🛠 기술 스택

| 구분          | 기술                                 |
|--------------|--------------------------------------|
| 프론트엔드    | Next.js 15, TypeScript, Tailwind CSS |
| 백엔드        | Express.js, TypeScript               |
| 데이터베이스  | PostgreSQL + Prisma ORM              |
| 기타 도구     | Postman, pgAdmin, GitHub, pnpm       |


## 🌟 주요 기능

- ✅ 할 일 추가 (제목, 날짜, 시간대, 우선순위, 유형)
- ✅ 할 일 목록 조회
- ✅ 할 일 수정
- ✅ 할 일 삭제
- ✅ 할 일 완료 여부 토글 (체크박스)
- 💄 파스텔톤 기반 커스텀 UI
- 🛠 현재까지 구현된 기능 기준으로 **1차 배포 완료**


## ⏳ 개발 예정 기능

- 🔍 할 일 검색 (제목 또는 설명 기준)
- 🗂 필터링 (날짜, 시간대, 우선순위 등)
- 🔄 Drag & Drop 기반 정렬 기능
- 🌑 다크 모드
- 📄 상세 보기 페이지 (`/todos/:id`)


## 프로젝트 구조

nex-todo/
├── frontend/              # Next.js 15 + TypeScript + Tailwind
│   ├── app/               # page.tsx, layout.tsx
│   ├── lib/
│   └── globals.css
│
├── backend/               # Express.js + TypeScript + Prisma
│   ├── src/                  
│   └── prisma/               
│
├── .env
├── README.md
└── Other config files  # tailwind.config.ts, postcss.config.js, etc.



## 📦 설치 및 실행 방법

bash
# 클론
git clone https://github.com/your-username/nex-todo.git
cd nex-todo

# 백엔드 실행
cd backend
pnpm install
npx prisma generate
npx prisma migrate dev --name init
npx tsx src/server.ts

# 프론트엔드 실행
cd ../frontend
pnpm install
pnpm dev

📌 개발자 정보
👩‍💻 개발자: 윤새라 (Sarah Yun)
📧 이메일: sarah.yun.swengineer@gmail.com

🧡 라이선스
MIT License
자유롭게 포크 및 수정 가능합니다.