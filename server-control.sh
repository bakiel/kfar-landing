#!/bin/bash

# Server Control Script for KFAR Coming Soon Page

case "$1" in
    start)
        echo "Starting KFAR server..."
        npm start > server.log 2>&1 &
        SERVER_PID=$!
        echo $SERVER_PID > server.pid
        sleep 2
        if ps -p $SERVER_PID > /dev/null; then
            echo "✅ Server started successfully (PID: $SERVER_PID)"
            echo "🌐 Visit: http://localhost:8080"
        else
            echo "❌ Failed to start server. Check server.log for errors"
        fi
        ;;
    
    stop)
        if [ -f server.pid ]; then
            PID=$(cat server.pid)
            if ps -p $PID > /dev/null; then
                kill $PID
                rm server.pid
                echo "✅ Server stopped"
            else
                echo "⚠️ Server not running (stale PID file removed)"
                rm server.pid
            fi
        else
            echo "⚠️ No server.pid file found"
        fi
        ;;
    
    restart)
        $0 stop
        sleep 1
        $0 start
        ;;
    
    status)
        if [ -f server.pid ]; then
            PID=$(cat server.pid)
            if ps -p $PID > /dev/null; then
                echo "✅ Server is running (PID: $PID)"
                echo "🌐 http://localhost:8080"
            else
                echo "❌ Server is not running (stale PID file)"
            fi
        else
            echo "❌ Server is not running"
        fi
        ;;
    
    logs)
        if [ -f server.log ]; then
            tail -f server.log
        else
            echo "No log file found"
        fi
        ;;
    
    *)
        echo "Usage: $0 {start|stop|restart|status|logs}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the server"
        echo "  stop    - Stop the server"
        echo "  restart - Restart the server"
        echo "  status  - Check server status"
        echo "  logs    - View server logs"
        exit 1
        ;;
esac