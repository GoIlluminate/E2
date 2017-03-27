port module Ports.Session exposing (..)

import Json.Decode as Json

port setStorage : Json.Value -> Cmd msg

port handleModelChanged : (Json.Value -> msg) -> Sub msg
