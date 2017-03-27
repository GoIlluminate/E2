module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Html as Html
import Json.Decode exposing (Decoder, Value)
import Json.Decode as JD
import Json.Encode exposing (object)
import Json.Encode as JE
import Ports.Window exposing (openWindow)
import Ports.Session exposing (handleModelChanged, setStorage)

main : Program (Maybe JD.Value) Model Msg
main =
    Html.programWithFlags
        { view = view
        , update = updateWithStorage
        , init = init
        , subscriptions = subscriptions
        }

init : Maybe JD.Value -> ( Model, Cmd Msg )
init savedModel =
    let
        maybeModel = Maybe.map (JD.decodeValue decodeModel) savedModel
        default = (initialModel, Cmd.none)
    in
        case maybeModel of
            Nothing -> Debug.log "Nothing" default
            Just (Err err) -> Debug.log err default
            Just (Ok model) -> (model, Cmd.none)

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
subscriptions model = handleModelChanged (\v -> (HandleNewColor (model.color)))


-- MODEL


type alias Model =
    { color : String
    }

encodeModel : Model -> Json.Encode.Value
encodeModel record =
    Json.Encode.object
        [ ("color",  Json.Encode.string <| record.color)
        ]

decodeModel : Json.Decode.Decoder Model
decodeModel =
    Json.Decode.map Model
        (JD.field "color" Json.Decode.string)

initialModel : Model
initialModel =
    Model "#FFFFFF"



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
        encoded = encodeModel newModel
        commands = case msg of
                       (OpenWindow _) -> [cmds]
                       _ -> [(setStorage encoded), cmds]
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
