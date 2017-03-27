port module Ports.Session exposing (..)

import Types exposing (Model)

port setStorage : Model -> Cmd msg

port handleModelChanged : (Model -> msg) -> Sub msg
