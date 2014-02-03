./deven &
sleep 3
kill $! 2>/dev/null && echo "Your program timed out and couldn't finish."
