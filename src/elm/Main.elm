module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Html as Html
import Json.Decode exposing (Decoder, Value)
import Json.Decode as JD
import Ports.Window exposing (openWindow)
import Ports.Session exposing (handleModelChanged, setStorage)
import Types exposing (initialModel, Model)

main : Program (Maybe Model) Model Msg
main =
    Html.programWithFlags
        { view = view
        , update = updateWithStorage
        , init = init
        , subscriptions = subscriptions
        }

init : Maybe Model -> ( Model, Cmd Msg )
init maybeModel =
    let
        default = (initialModel, Cmd.none)
    in
        case maybeModel of
            Nothing -> Debug.log "Nothing" default
            Just model -> (model, Cmd.none)

fetchColor : Cmd Msg
fetchColor =
    Http.send
        processColor
        <| Http.get "http://localhost:3000/color" Json.Decode.string

processColor : Result Http.Error String -> Msg
processColor result =
    case result of
        Ok newColor -> HandleNewColor newColor
        Err err -> HandleColorError err

subscriptions : Model -> Sub Msg
subscriptions model = handleModelChanged (\m -> HandleNewColor m.color)


-- UPDATE


type Msg
    = ChangeColor
    | HandleNewColor String
    | HandleColorError Http.Error
    | OpenWindow String

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangeColor ->
            ( model, fetchColor )

        HandleNewColor color ->
            ( { model | color = color }, Cmd.none )

        HandleColorError error ->
            ( model, Cmd.none )
        OpenWindow url ->
            ( model, openWindow url )

updateWithStorage : Msg -> Model -> ( Model, Cmd Msg )
updateWithStorage msg model =
    let
        ( newModel, cmds ) =
            update msg model
        commands = case msg of
                       (OpenWindow _) -> [cmds]
                       _ -> [(setStorage newModel), cmds]
    in
        ( newModel
        , Cmd.batch commands
        )


-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container", style [ ( "height", "100%" ), ( "background-color", model.color ) ] ]
        [ div [ class "actions" ]
            [ button [ class "btn", onClick ChangeColor ]
                [ span [] [ text "Elm, Gimme Colors!" ] ]
            , button [ class "btn", onClick (OpenWindow "/") ]
                [ span [] [ text "Open Web Page." ] ]
            ]
        ]
