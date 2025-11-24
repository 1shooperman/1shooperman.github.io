---
title: "Fun with MCP"
date: "2025-11-24"
excerpt: "MCP for the fun of it"
---

# MCP for the fun of it

I was reading Cursor's docs -- fun right!? -- and realized that the IDE supports MCP services. I realized that this could make my vibe coding and peer review process a little more fluid. You see, I have this app that is broken into several layers: infra, data, frontend, and backend.

## The bits

The app itself lives in a series of 7, non-overlapping docker containers, backed by a mysql database, with a PHP (laravel) backend API layer and a Vue frontend. Not really the tech stack I'd have chosen for this app but I am happy with work with it.

## The ~/.cursor/mcp.json
This is a little incomplete because it's still a WIP. I half vide-coded and half stumbled my way through writing a series of dual purpose mcp servers.

```
{
    "mcpServers": {
      "mcp-db-mysql": {
        "command": "mcp-servers/packages/mcp-db-mysql/start-server.sh",
        "args": [],
        "env": {
          "MYSQL_HOST": "127.0.0.1",
          "MYSQL_PORT": "1234",
          "MYSQL_USER": "secret",
          "MYSQL_PASSWORD": "secret",
          "MYSQL_DATABASE": "secret"
        },
        "cwd": "mcp-servers/packages/mcp-db-mysql"
      },
      "mcp-laravel": {
        "command": "mcp-servers/packages/mcp-laravel/start-server.sh",
        "args": [],
        "env": {
          "LARAVEL_API_URL": "http://127.0.0.1:54321",
          "LARAVEL_CWD": some-dir"
        },
        "cwd": "mcp-servers/packages/mcp-laravel"
      },
      "mcp-vue-project": {
        "command": "mcp-servers/packages/mcp-vue-project/start-server.sh",
        "args": [],
        "env": {
          "VUE_CWD": "some-other-dir
        },
        "cwd": "mcp-servers/packages/mcp-vue-project"
      },
      "mcp-docker-compose": {
        "command": "mcp-servers/packages/mcp-docker-compose/start-server.sh",
        "args": [],
        "env": {
          "COMPOSE_CWD": "some-docker-file-dir",
          "COMPOSE_FILE": "docker-compose.yml"
        },
        "cwd": "mcp-servers/packages/mcp-docker-compose"
      }
    }
  }
  
```

## The solution

## The Takeaways
- MCP services come in two transport flavors: websocket and stdio. Cursor only supports stdio at the time of writing. 
- The service can pretend like it's working but fail pretty badly when a client tries to use it.


