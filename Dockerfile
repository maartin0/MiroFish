FROM python:3.11

RUN apt-get update \
  && apt-get install -y --no-install-recommends nodejs npm \
  && npm install -g pnpm \
  && rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:0.9.26 /uv /uvx /bin/

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY frontend/package.json frontend/package-lock.json ./frontend/
COPY backend/pyproject.toml backend/uv.lock ./backend/

RUN pnpm install --frozen-lockfile \
  && pnpm install --prefix frontend \
  && cd backend && uv sync --frozen

COPY . .

RUN cd frontend && pnpm run build

EXPOSE 5001

CMD ["pnpm", "run", "backend"]
