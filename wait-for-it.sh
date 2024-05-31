#!/usr/bin/env bash
# Use this script to test if a given TCP host/port are available

TIMEOUT=15
QUIET=0
HOST=""
PORT=""

echoerr() { if [[ $QUIET -ne 1 ]]; then echo "$@" 1>&2; fi }

usage()
{
    cat << USAGE >&2
Usage:
    wait-for-it.sh [-t timeout] [-- command args]
    -t TIMEOUT  Timeout in seconds, zero for no timeout
    -q          Quiet mode, don't output any status messages
    -- COMMAND ARGS    Execute command with args after the test finishes
USAGE
    exit 1
}

wait_for()
{
    for i in `seq $TIMEOUT` ; do
        nc -z "$HOST" "$PORT" > /dev/null 2>&1
        result=$?
        if [[ $result -eq 0 ]] ; then
            if [[ $QUIET -ne 1 ]] ; then echoerr "$HOST:$PORT is available"; fi
            return 0
        fi
        sleep 1
    done
    echoerr "$HOST:$PORT is not available after $TIMEOUT seconds"
    return 1
}

while [[ $# -gt 0 ]]
do
    case "$1" in
        *:* )
        HOST=$(printf "%s\n" "$1"| cut -d : -f 1)
        PORT=$(printf "%s\n" "$1"| cut -d : -f 2)
        shift 1
        ;;
        -q)
        QUIET=1
        shift 1
        ;;
        -t)
        TIMEOUT="$2"
        if [[ $TIMEOUT == "" ]]; then break; fi
        shift 2
        ;;
        --)
        shift
        break
        ;;
        --help)
        usage
        ;;
        *)
        echoerr "Unknown argument: $1"
        usage
        ;;
    esac
done

if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    echoerr "Error: you need to provide a host and port to test."
    usage
fi

wait_for

shift $((OPTIND-1))

if [[ "$*" != "" ]]; then
    exec "$@"
fi