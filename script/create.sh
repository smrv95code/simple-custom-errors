#!/bin/bash

DIR_SRC="./lib"
DIR_DEST="."
SIMPLE="SimpleError"
PACK="customErrors"


function create () {

  local template_type
  local class_name
  local source_file
  local dest_file

  while [[ $# -gt 0 ]]; do
    case $1 in
      -s | --simple)  template_type="S"
                      shift
                      ;;
      -f | --full)    template_type="F"
                      shift
                      ;;
      *)              class_name=$1
                      shift
                      ;;
    esac
  done

  if [[ -z $template_type ]]; then
    echo "Missing argument: type. Use options --simple or --pack."
    exit 1
  fi

  if [[ -z $class_name ]]; then
    echo "Missing argument: error name."
    exit 1
  fi

  if [[ $template_type == "S" ]]; then
    source_file="$DIR_SRC/$SIMPLE.js"
    dest_file="$DIR_DEST/$class_name.js"
  fi

  if [[ $template_type == "F" ]]; then
    source_file="$DIR_SRC/$PACK.js"
    dest_file="$DIR_DEST/$PACK.js"
  fi

  cat $source_file | sed s/"${SIMPLE}"/"${class_name}"/g > $dest_file
  exit
}


# start script

if [[ -z $(type -t "sed" 2> /dev/null) ]]; then
  echo "Missing dependency: sed. Install it in your system before proceeding."
  exit 1
fi

create $1 $2
