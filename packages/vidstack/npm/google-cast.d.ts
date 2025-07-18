interface Window {
  cast?: typeof cast;
  __onGCastApiAvailable?(available: boolean, reason?: string): void;
}

declare namespace chrome.cast {
  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.AutoJoinPolicy
   */
  export enum AutoJoinPolicy {
    CUSTOM_CONTROLLER_SCOPED = 'custom_controller_scoped',
    TAB_AND_ORIGIN_SCOPED = 'tab_and_origin_scoped',
    ORIGIN_SCOPED = 'origin_scoped',
    PAGE_SCOPED = 'page_scoped',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.DefaultActionPolicy
   */
  export enum DefaultActionPolicy {
    CREATE_SESSION = 'create_session',
    CAST_THIS_TAB = 'cast_this_tab',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.Capability
   */
  export enum Capability {
    VIDEO_OUT = 'video_out',
    AUDIO_OUT = 'audio_out',
    VIDEO_IN = 'video_in',
    AUDIO_IN = 'audio_in',
    MULTIZONE_GROUP = 'multizone_group',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.ErrorCode
   */
  export enum ErrorCode {
    CANCEL = 'cancel',
    TIMEOUT = 'timeout',
    API_NOT_INITIALIZED = 'api_not_initialized',
    INVALID_PARAMETER = 'invalid_parameter',
    EXTENSION_NOT_COMPATIBLE = 'extension_not_compatible',
    EXTENSION_MISSING = 'extension_missing',
    RECEIVER_UNAVAILABLE = 'receiver_unavailable',
    SESSION_ERROR = 'session_error',
    CHANNEL_ERROR = 'channel_error',
    LOAD_MEDIA_FAILED = 'load_media_failed',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.ReceiverAvailability
   */
  export enum ReceiverAvailability {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.SenderPlatform
   */
  export enum SenderPlatform {
    CHROME = 'chrome',
    IOS = 'ios',
    ANDROID = 'android',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.ReceiverType
   */
  export enum ReceiverType {
    CAST = 'cast',
    DIAL = 'dial',
    HANGOUT = 'hangout',
    CUSTOM = 'custom',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.ReceiverAction
   */
  export enum ReceiverAction {
    CAST = 'cast',
    STOP = 'stop',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.SessionStatus
   */
  export enum SessionStatus {
    CONNECTED = 'connected',
    DISCONNECTED = 'disconnected',
    STOPPED = 'stopped',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.VERSION
   */
  export var VERSION: number[];

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.isAvailable
   */
  export var isAvailable: boolean;

  /**
   * @param apiConfig
   * @param successCallback
   * @param errorCallback
   */
  export function initialize(
    apiConfig: chrome.cast.ApiConfig,
    successCallback: Function,
    errorCallback: (error: chrome.cast.Error) => void,
  ): void;

  /**
   * @param successCallback
   * @param errorCallback
   * @param opt_sessionRequest
   * @param opt_label
   */
  export function requestSession(
    successCallback: (session: chrome.cast.Session) => void,
    errorCallback: (error: chrome.cast.Error) => void,
    sessionRequest?: chrome.cast.SessionRequest,
    label?: string,
  ): void;

  /**
   * @param sessionId The id of the session to join.
   */
  export function requestSessionById(sessionId: string): void;

  /**
   * @param listener
   */
  export function addReceiverActionListener(
    listener: (receiver: chrome.cast.Receiver, receiverAction: chrome.cast.ReceiverAction) => void,
  ): void;

  /**
   * @param listener
   */
  export function removeReceiverActionListener(
    listener: (receiver: chrome.cast.Receiver, receiverAction: chrome.cast.ReceiverAction) => void,
  ): void;

  /**
   * @param message The message to log.
   */
  export function logMessage(message: string): void;

  /**
   * @param receivers
   * @param successCallback
   * @param errorCallback
   */
  export function setCustomReceivers(
    receivers: chrome.cast.Receiver[],
    successCallback: Function,
    errorCallback: (error: chrome.cast.Error) => void,
  ): void;

  /**
   * @param receiver
   * @param successCallback
   * @param errorCallback
   */
  export function setReceiverDisplayStatus(
    receiver: chrome.cast.Receiver,
    successCallback: Function,
    errorCallback: (error: chrome.cast.Error) => void,
  ): void;

  /**
   * @param escaped A string to unescape.
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast#.unescape
   */
  export function unescape(escaped: string): string;

  export class ApiConfig {
    /**
     * @param sessionRequest
     * @param sessionListener
     * @param receiverListener
     * @param opt_autoJoinPolicy
     * @param opt_defaultActionPolicy
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.ApiConfig
     */
    constructor(
      sessionRequest: chrome.cast.SessionRequest,
      sessionListener: (session: chrome.cast.Session) => void,
      receiverListener: (receiverAvailability: chrome.cast.ReceiverAvailability) => void,
      autoJoinPolicy?: chrome.cast.AutoJoinPolicy,
      defaultActionPolicy?: chrome.cast.DefaultActionPolicy,
    );

    sessionRequest: chrome.cast.SessionRequest;
    sessionListener: (session: chrome.cast.Session) => void;
    receiverListener: (receiverAvailability: chrome.cast.ReceiverAvailability) => void;
    autoJoinPolicy: chrome.cast.AutoJoinPolicy;
    defaultActionPolicy: chrome.cast.DefaultActionPolicy;
  }

  export class Error {
    /**
     * @param code
     * @param opt_description
     * @param opt_details
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.Error
     */
    constructor(code: chrome.cast.ErrorCode, description?: string, details?: Object);

    code: chrome.cast.ErrorCode;
    description: string | null;
    details: object;
  }

  export class Image {
    /**
     * @param url
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.Image
     */
    constructor(url: string);

    url: string;
    height: number | null;
    width: number | null;
  }

  export class SenderApplication {
    /**
     * @param platform
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.SenderApplication
     */
    constructor(platform: chrome.cast.SenderPlatform);

    platform: chrome.cast.SenderPlatform;
    url: string | null;
    packageId: string | null;
  }

  export class SessionRequest {
    /**
     * @param appId
     * @param opt_capabilities
     * @param opt_timeout
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.SessionRequest
     */
    constructor(appId: string, capabilities?: chrome.cast.Capability[], timeout?: number);

    appId: string;
    capabilities: chrome.cast.Capability[];
    requestSessionTimeout: number;
    language: string | null;
  }

  export class Session {
    /**
     * @param sessionId
     * @param appId
     * @param displayName
     * @param appImages
     * @param receiver
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.Session
     */
    constructor(
      sessionId: string,
      appId: string,
      displayName: string,
      appImages: chrome.cast.Image[],
      receiver: chrome.cast.Receiver,
    );

    sessionId: string;
    appId: string;
    displayName: string;
    appImages: chrome.cast.Image[];
    receiver: chrome.cast.Receiver;
    senderApps: chrome.cast.SenderApplication[];
    namespaces: Array<{ name: string }>;
    media: chrome.cast.media.Media[];
    status: chrome.cast.SessionStatus;
    statusText: string | null;
    transportId: string;

    /**
     * @param newLevel
     * @param successCallback
     * @param errorCallback
     */
    setReceiverVolumeLevel(
      newLevel: number,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param muted
     * @param successCallback
     * @param errorCallback
     */
    setReceiverMuted(
      muted: boolean,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param successCallback
     * @param errorCallback
     */
    leave(successCallback: Function, errorCallback: (error: chrome.cast.Error) => void): void;

    /**
     * @param successCallback
     * @param errorCallback
     */
    stop(successCallback: Function, errorCallback: (error: chrome.cast.Error) => void): void;

    /**
     * @param namespace
     * @param message
     * @param successCallback
     * @param errorCallback
     */
    sendMessage(
      namespace: string,
      message: string | object,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param listener
     */
    addUpdateListener(listener: (isAlive: boolean) => void): void;

    /**
     * @param listener
     */
    removeUpdateListener(listener: (isAlive: boolean) => void): void;

    /**
     * @param namespace
     * @param listener
     */
    addMessageListener(
      namespace: string,
      listener: (namespace: string, message: string) => void,
    ): void;

    /**
     * @param namespace
     * @param listener
     */
    removeMessageListener(
      namespace: string,
      listener: (namespace: string, message: string) => void,
    ): void;

    /**
     * @param listener
     */
    addMediaListener(listener: (media: chrome.cast.media.Media) => void): void;

    /**
     * @param listener
     */
    removeMediaListener(listener: (media: chrome.cast.media.Media) => void): void;

    /**
     * @param loadRequest
     * @param successCallback
     * @param errorCallback
     */
    loadMedia(
      loadRequest: chrome.cast.media.LoadRequest,
      successCallback: (media: chrome.cast.media.Media) => void,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param queueLoadRequest
     * @param successCallback
     * @param errorCallback
     */
    queueLoad(
      queueLoadRequest: chrome.cast.media.QueueLoadRequest,
      successCallback: (media: chrome.cast.media.Media) => void,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;
  }

  export class Receiver {
    /**
     * @param label
     * @param friendlyName
     * @param opt_capabilities
     * @param opt_volume
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.Receiver
     */
    constructor(
      label: string,
      friendlyName: string,
      capabilities?: chrome.cast.Capability[],
      volume?: chrome.cast.Volume,
    );

    label: string;
    friendlyName: string;
    capabilities: chrome.cast.Capability[];
    volume: chrome.cast.Volume;
    receiverType: chrome.cast.ReceiverType;
    displayStatus: chrome.cast.ReceiverDisplayStatus;
  }

  export class ReceiverDisplayStatus {
    /**
     * @param statusText
     * @param appImages
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.ReceiverDisplayStatus
     */
    constructor(statusText: string, appImages: chrome.cast.Image[]);

    statusText: string;
    appImages: chrome.cast.Image[];
  }

  export class Volume {
    /**
     * @param opt_level
     * @param opt_muted
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.Volume
     */
    constructor(level?: number, muted?: boolean);

    level: number | null;
    muted: boolean | null;
  }
}

declare namespace chrome.cast.media {
  export var DEFAULT_MEDIA_RECEIVER_APP_ID: string;

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.MediaCommand
   */
  export enum MediaCommand {
    PAUSE = 'pause',
    SEEK = 'seek',
    STREAM_VOLUME = 'stream_volume',
    STREAM_MUTE = 'stream_mute',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.MetadataType
   */
  export enum MetadataType {
    GENERIC,
    TV_SHOW,
    MOVIE,
    MUSIC_TRACK,
    PHOTO,
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.PlayerState
   */
  export enum PlayerState {
    IDLE = 'IDLE',
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    BUFFERING = 'BUFFERING',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.ResumeState
   */
  export enum ResumeState {
    PLAYBACK_START = 'PLAYBACK_START',
    PLAYBACK_PAUSE = 'PLAYBACK_PAUSE',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.StreamType
   */
  export enum StreamType {
    BUFFERED = 'BUFFERED',
    LIVE = 'LIVE',
    OTHER = 'OTHER',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.IdleReason
   */
  export enum IdleReason {
    CANCELLED = 'CANCELLED',
    INTERRUPTED = 'INTERRUPTED',
    FINISHED = 'FINISHED',
    ERROR = 'ERROR',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.RepeatMode
   */
  export enum RepeatMode {
    OFF = 'REPEAT_OFF',
    ALL = 'REPEAT_ALL',
    SINGLE = 'REPEAT_SINGLE',
    ALL_AND_SHUFFLE = 'REPEAT_ALL_AND_SHUFFLE',
  }

  export class QueueItem {
    /**
     * @param mediaInfo
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.QueueItem
     */
    constructor(mediaInfo: chrome.cast.media.MediaInfo);

    activeTrackIds: Number[];
    autoplay: boolean;
    customData: Object;
    itemId: number;
    media: chrome.cast.media.MediaInfo;
    preloadTime: number;
    startTime: number;
  }

  export class QueueLoadRequest {
    /**
     * @param items
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.QueueLoadRequest
     */
    constructor(items: chrome.cast.media.QueueItem[]);

    customData: Object;
    items: chrome.cast.media.QueueItem[];
    repeatMode: chrome.cast.media.RepeatMode;
    startIndex: number;
  }

  export class QueueInsertItemsRequest {
    /**
     * @param itemsToInsert
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.QueueInsertItemsRequest
     */
    constructor(itemsToInsert: chrome.cast.media.QueueItem[]);

    customData: Object;
    insertBefore: number;
    items: chrome.cast.media.QueueItem[];
  }

  export class QueueRemoveItemsRequest {
    /**
     * @param itemIdsToRemove
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.QueueRemoveItemsRequest
     */
    constructor(itemIdsToRemove: number[]);

    customData: Object;
    itemIds: number[];
  }

  export class QueueReorderItemsRequest {
    /**
     * @param itemIdsToReorder
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.QueueReorderItemsRequest
     */
    constructor(itemIdsToReorder: number[]);

    customData: Object;
    insertBefore: number;
    itemIds: number[];
  }

  export class QueueUpdateItemsRequest {
    /**
     * @param itemsToUpdate
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.QueueUpdateItemsRequest
     */
    constructor(itemsToUpdate: chrome.cast.media.QueueItem[]);

    customData: Object;
    item: chrome.cast.media.QueueItem[];
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.TrackType
   */
  export enum TrackType {
    TEXT = 'TEXT',
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.TextTrackType
   */
  export enum TextTrackType {
    SUBTITLES = 'SUBTITLES',
    CAPTIONS = 'CAPTIONS',
    DESCRIPTIONS = 'DESCRIPTIONS',
    CHAPTERS = 'CHAPTERS',
    METADATA = 'METADATA',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.TextTrackEdgeType
   */
  export enum TextTrackEdgeType {
    NONE = 'NONE',
    OUTLINE = 'OUTLINE',
    DROP_SHADOW = 'DROP_SHADOW',
    RAISED = 'RAISED',
    DEPRESSED = 'DEPRESSED',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.TextTrackWindowType
   */
  export enum TextTrackWindowType {
    NONE = 'NONE',
    NORMAL = 'NORMAL',
    ROUNDED_CORNERS = 'ROUNDED_CORNERS',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.TextTrackFontGenericFamily
   */
  export enum TextTrackFontGenericFamily {
    SANS_SERIF = 'SANS_SERIF',
    MONOSPACED_SANS_SERIF = 'MONOSPACED_SANS_SERIF',
    SERIF = 'SERIF',
    MONOSPACED_SERIF = 'MONOSPACED_SERIF',
    CASUAL = 'CASUAL',
    CURSIVE = 'CURSIVE',
    SMALL_CAPITALS = 'SMALL_CAPITALS',
  }

  /**
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media#.TextTrackFontStyle
   */
  export enum TextTrackFontStyle {
    NORMAL = 'NORMAL',
    BOLD = 'BOLD',
    BOLD_ITALIC = 'BOLD_ITALIC',
    ITALIC = 'ITALIC',
  }

  export class GetStatusRequest {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.GetStatusRequest
     */
    constructor();

    customData: Object;
  }

  export class PauseRequest {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.PauseRequest
     */
    constructor();

    customData: Object;
  }

  export class PlayRequest {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.PlayRequest
     */
    constructor();

    customData: Object;
  }

  export class SeekRequest {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.SeekRequest
     */
    constructor();

    currentTime: number;
    resumeState: chrome.cast.media.ResumeState;
    customData: Object;
  }

  export class StopRequest {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.StopRequest
     */
    constructor();

    customData: Object;
  }

  export class VolumeRequest {
    /**
     * @param volume
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.VolumeRequest
     */
    constructor(volume: chrome.cast.Volume);

    volume: chrome.cast.Volume;
    customData: Object;
  }

  export class LoadRequest {
    /**
     * @param mediaInfo
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.LoadRequest
     */
    constructor(mediaInfo: chrome.cast.media.MediaInfo);

    activeTrackIds: number[];
    autoplay: boolean;
    currentTime: number;
    customData: Object;
    media: chrome.cast.media.MediaInfo;
    playbackRate?: number | undefined;
  }

  export class EditTracksInfoRequest {
    /**
     * @param opt_activeTrackIds
     * @param opt_textTrackStyle
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.EditTracksInfoRequest
     */
    constructor(activeTrackIds?: number[], textTrackStyle?: chrome.cast.media.TextTrackStyle);

    activeTrackIds: number[];
    textTrackStyle: chrome.cast.media.TextTrackStyle;
  }

  export class GenericMediaMetadata {
    images: chrome.cast.Image[];
    metadataType: chrome.cast.media.MetadataType;
    releaseDate: string;
    /** @deprecated Use releaseDate instead. */
    releaseYear: number;
    subtitle: string;
    title: string;
    /** @deprecated Use metadataType instead. */
    type: chrome.cast.media.MetadataType;
  }

  export class MovieMediaMetadata {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.MovieMediaMetadata
     */
    constructor();

    images: chrome.cast.Image[];
    metadataType: chrome.cast.media.MetadataType;
    releaseDate: string;
    /** @deprecated Use releaseDate instead. */
    releaseYear: number;
    subtitle: string;
    title: string;
    studio: string;
    /** @deprecated Use metadataType instead. */
    type: chrome.cast.media.MetadataType;
  }

  export class TvShowMediaMetadata {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.TvShowMediaMetadata
     */
    constructor();

    metadataType: chrome.cast.media.MetadataType;
    seriesTitle: string;
    title: string;
    season: number;
    episode: number;
    images: chrome.cast.Image[];
    originalAirdate: string;

    /** @deprecated Use metadataType instead. */
    type: chrome.cast.media.MetadataType;
    /** @deprecated Use title instead. */
    episodeTitle: string;
    /** @deprecated Use season instead. */
    seasonNumber: number;
    /** @deprecated Use episode instead. */
    episodeNumber: number;
    /** @deprecated Use originalAirdate instead. */
    releaseYear: number;
  }

  export class MusicTrackMediaMetadata {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.MusicTrackMediaMetadata
     */
    constructor();

    metadataType: chrome.cast.media.MetadataType;
    albumName: string;
    title: string;
    albumArtist: string;
    artist: string;
    composer: string;
    songName: string;
    trackNumber: number;
    discNumber: number;
    images: chrome.cast.Image[];
    releaseDate: string;

    /** @deprecated Use metadataType instead. */
    type: chrome.cast.media.MetadataType;
    /** @deprecated Use artist instead. */
    artistName: string;
    /** @deprecated Use releaseDate instead. */
    releaseYear: number;
  }

  export class PhotoMediaMetadata {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.PhotoMediaMetadata
     */
    constructor();

    metadataType: chrome.cast.media.MetadataType;
    title: string;
    artist: string;
    location: string;
    images: chrome.cast.Image[];
    latitude: number;
    longitude: number;
    width: number;
    height: number;
    creationDateTime: string;

    /** @deprecated Use metadataType instead. */
    type: chrome.cast.media.MetadataType;
  }

  export class MediaInfo {
    /**
     * @param contentId
     * @param contentType
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.MediaInfo
     */
    constructor(contentId: string, contentType: string);

    contentId: string;
    streamType: chrome.cast.media.StreamType;
    contentType: string;
    metadata: any;
    duration: number;
    tracks: chrome.cast.media.Track[];
    textTrackStyle: chrome.cast.media.TextTrackStyle;
    customData: Object;
    hlsSegmentFormat: string;
    hlsVideoSegmentFormat: string;    
  }

  export class Media {
    /**
     * @param sessionId
     * @param mediaSessionId
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.Media
     */
    constructor(sessionId: string, mediaSessionId: number);

    activeTrackIds: number[];
    currentItemId: number;
    customData: Object;
    idleReason: chrome.cast.media.IdleReason | null;
    items: chrome.cast.media.QueueItem[];
    liveSeekableRange?: chrome.cast.media.LiveSeekableRange | undefined;
    loadingItemId: number;
    media: chrome.cast.media.MediaInfo;
    mediaSessionId: number;
    playbackRate: number;
    playerState: chrome.cast.media.PlayerState;
    preloadedItemId: number;
    repeatMode: chrome.cast.media.RepeatMode;
    sessionId: string;
    supportedMediaCommands: chrome.cast.media.MediaCommand[];
    volume: chrome.cast.Volume;

    /** @deprecated Use getEstimatedTime instead */
    currentTime: number;

    /**
     * @param getStatusRequest
     * @param successCallback
     * @param errorCallback
     */
    getStatus(
      getStatusRequest: chrome.cast.media.GetStatusRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param playRequest
     * @param successCallback
     * @param errorCallback
     */
    play(
      playRequest: chrome.cast.media.PlayRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param pauseRequest
     * @param successCallback
     * @param errorCallback
     */
    pause(
      pauseRequest: chrome.cast.media.PauseRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param seekRequest
     * @param successCallback
     * @param errorCallback
     */
    seek(
      seekRequest: chrome.cast.media.SeekRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param stopRequest
     * @param successCallback
     * @param errorCallback
     */
    stop(
      stopRequest: chrome.cast.media.StopRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param volumeRequest
     * @param successCallback
     * @param errorCallback
     */
    setVolume(
      volumeRequest: chrome.cast.media.VolumeRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param editTracksInfoRequest
     * @param successCallback
     * @param errorCallback
     */
    editTracksInfo(
      editTracksInfoRequest: chrome.cast.media.EditTracksInfoRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param command
     * @return whether or not the receiver supports the given chrome.cast.media.MediaCommand
     */
    supportsCommand(command: chrome.cast.media.MediaCommand): boolean;

    /**
     * @param listener
     */
    addUpdateListener(listener: (isAlive: boolean) => void): void;

    /**
     * @param listener
     */
    removeUpdateListener(listener: (isAlive: boolean) => void): void;

    /**
     * @return
     * @suppress {deprecated} Uses currentTime member to compute estimated time.
     */
    getEstimatedTime(): number;

    /**
     * @param item
     * @param successCallback
     * @param errorCallback
     */
    queueAppendItem(
      item: chrome.cast.media.QueueItem,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param queueInsertItemsRequest
     * @param successCallback
     * @param errorCallback
     */
    queueInsertItems(
      queueInsertItemsRequest: chrome.cast.media.QueueInsertItemsRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param itemId
     * @param successCallback
     * @param errorCallback
     */
    queueJumpToItem(
      itemId: number,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param itemId
     * @param newIndex
     * @param successCallback
     * @param errorCallback
     */
    queueMoveItemToNewIndex(
      itemId: number,
      newIndex: number,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param successCallback
     * @param errorCallback
     */
    queueNext(successCallback: Function, errorCallback: (error: chrome.cast.Error) => void): void;

    /**
     * @param successCallback
     * @param errorCallback
     */
    queuePrev(successCallback: Function, errorCallback: (error: chrome.cast.Error) => void): void;

    /**
     * @param itemId
     * @param successCallback
     * @param errorCallback
     */
    queueRemoveItem(
      itemId: number,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param queueReorderItemsRequest
     * @param successCallback
     * @param errorCallback
     */
    queueReorderItems(
      queueReorderItemsRequest: chrome.cast.media.QueueReorderItemsRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param repeatMode
     * @param successCallback
     * @param errorCallback
     */
    queueSetRepeatMode(
      repeatMode: chrome.cast.media.RepeatMode,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;

    /**
     * @param queueUpdateItemsRequest
     * @param successCallback
     * @param errorCallback
     */
    queueUpdateItems(
      queueUpdateItemsRequest: chrome.cast.media.QueueUpdateItemsRequest,
      successCallback: Function,
      errorCallback: (error: chrome.cast.Error) => void,
    ): void;
  }

  export class Track {
    /**
     * @param trackId
     * @param trackType
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.Track
     */
    constructor(trackId: number, trackType: chrome.cast.media.TrackType);

    trackId: number;
    trackContentId: string;
    trackContentType: string;
    type: chrome.cast.media.TrackType;
    name: string;
    language: string;
    subtype: chrome.cast.media.TextTrackType;
    customData: Object;
  }

  export class TextTrackStyle {
    /**
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.TextTrackStyle
     */
    constructor();

    foregroundColor: string;
    backgroundColor: string;
    edgeType: chrome.cast.media.TextTrackEdgeType;
    edgeColor: string;
    windowType: chrome.cast.media.TextTrackWindowType;
    windowColor: string;
    windowRoundedCornerRadius: number;
    fontScale: number;
    fontFamily: string;
    fontGenericFamily: chrome.cast.media.TextTrackFontGenericFamily;
    fontStyle: chrome.cast.media.TextTrackFontStyle;
    customData: Object;
  }

  export class LiveSeekableRange {
    /**
     * @param start
     * @param end
     * @param isMovingWindow
     * @param isLiveDone
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.LiveSeekableRange
     */
    constructor(start?: number, end?: number, isMovingWindow?: boolean, isLiveDone?: boolean);

    start?: number | undefined;
    end?: number | undefined;
    isMovingWindow?: boolean | undefined;
    isLiveDone?: boolean | undefined;
  }
}

/**
 * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.timeout
 */
declare namespace chrome.cast.media.timeout {
  export var load: number;
  export var getStatus: number;
  export var play: number;
  export var pause: number;
  export var seek: number;
  export var stop: number;
  export var setVolume: number;
  export var editTracksInfo: number;
  export var queueInsert: number;
  export var queueLoad: number;
  export var queueRemove: number;
  export var queueReorder: number;
  export var queueUpdate: number;
}

/**
 * Cast Application Framework
 *
 * @see https://developers.google.com/cast/docs/reference/chrome/cast.framework
 */
declare namespace cast.framework {
  export enum LoggerLevel {
    DEBUG,
    INFO,
    WARNING,
    ERROR,
    NONE,
  }

  export enum CastState {
    NO_DEVICES_AVAILABLE = 'NO_DEVICES_AVAILABLE',
    NOT_CONNECTED = 'NOT_CONNECTED',
    CONNECTING = 'CONNECTING',
    CONNECTED = 'CONNECTED',
  }

  export enum SessionState {
    NO_SESSION = 'NO_SESSION',
    SESSION_STARTING = 'SESSION_STARTING',
    SESSION_STARTED = 'SESSION_STARTED',
    SESSION_START_FAILED = 'SESSION_START_FAILED',
    SESSION_ENDING = 'SESSION_ENDING',
    SESSION_ENDED = 'SESSION_ENDED',
    SESSION_RESUMED = 'SESSION_RESUMED',
  }

  export enum CastContextEventType {
    CAST_STATE_CHANGED = 'caststatechanged',
    SESSION_STATE_CHANGED = 'sessionstatechanged',
  }

  export enum SessionEventType {
    APPLICATION_STATUS_CHANGED = 'applicationstatuschanged',
    APPLICATION_METADATA_CHANGED = 'applicationmetadatachanged',
    ACTIVE_INPUT_STATE_CHANGED = 'activeinputstatechanged',
    VOLUME_CHANGED = 'volumechanged',
    MEDIA_SESSION = 'mediasession',
  }

  export enum RemotePlayerEventType {
    ANY_CHANGE = 'anyChanged',
    IS_CONNECTED_CHANGED = 'isConnectedChanged',
    IS_MEDIA_LOADED_CHANGED = 'isMediaLoadedChanged',
    DURATION_CHANGED = 'durationChanged',
    CURRENT_TIME_CHANGED = 'currentTimeChanged',
    IS_PAUSED_CHANGED = 'isPausedChanged',
    VOLUME_LEVEL_CHANGED = 'volumeLevelChanged',
    CAN_CONTROL_VOLUME_CHANGED = 'canControlVolumeChanged',
    IS_MUTED_CHANGED = 'isMutedChanged',
    CAN_PAUSE_CHANGED = 'canPauseChanged',
    CAN_SEEK_CHANGED = 'canSeekChanged',
    DISPLAY_NAME_CHANGED = 'displayNameChanged',
    STATUS_TEXT_CHANGED = 'statusTextChanged',
    TITLE_CHANGED = 'titleChanged',
    DISPLAY_STATUS_CHANGED = 'displayStatusChanged',
    MEDIA_INFO_CHANGED = 'mediaInfoChanged',
    IMAGE_URL_CHANGED = 'imageUrlChanged',
    PLAYER_STATE_CHANGED = 'playerStateChanged',
    LIVE_SEEKABLE_RANGE_CHANGED = 'liveSeekableRange',
  }

  export enum ActiveInputState {
    ACTIVE_INPUT_STATE_UNKNOWN = -1,
    ACTIVE_INPUT_STATE_NO = 0,
    ACTIVE_INPUT_STATE_YES = 1,
  }

  export interface CastOptions {
    autoJoinPolicy: chrome.cast.AutoJoinPolicy;
    language?: string | undefined;
    receiverApplicationId?: string | undefined;
    resumeSavedSession?: boolean | undefined;
    /** The following flag enables Cast Connect(requires Chrome 87 or higher) */
    androidReceiverCompatible?: boolean | undefined;
  }

  export const VERSION: string;
  export function setLoggerLevel(level: LoggerLevel): void;

  export class CastContext {
    static getInstance(): CastContext;
    setOptions(options: CastOptions): void;
    getCastState(): CastState;
    getSessionState(): SessionState;
    requestSession(): Promise<chrome.cast.ErrorCode | undefined>;
    getCurrentSession(): CastSession | null;
    endCurrentSession(stopCasting: boolean): void;
    addEventListener<T extends keyof CastContextEvents>(
      type: T,
      handler: (event: CastContextEvents[T]) => void,
    ): void;
    removeEventListener<T extends keyof CastContextEvents>(
      type: T,
      handler: (event: CastContextEvents[T]) => void,
    ): void;
  }

  export interface CastContextEvents {
    [CastContextEventType.CAST_STATE_CHANGED]: CastStateEventData;
    [CastContextEventType.SESSION_STATE_CHANGED]: SessionStateEventData;
  }

  export class CastSession {
    constructor(sessionObj: chrome.cast.Session, state: SessionState);
    getSessionObj(): chrome.cast.Session;
    getSessionId(): string;
    getSessionState(): SessionState;
    getCastDevice(): chrome.cast.Receiver;
    getApplicationMetadata(): ApplicationMetadata;
    getApplicationStatus(): string;
    getActiveInputState(): ActiveInputState;
    endSession(stopCasting: boolean): void;
    setVolume(volume: number): Promise<chrome.cast.ErrorCode | undefined>;
    getVolume(): number;
    setMute(mute: boolean): Promise<chrome.cast.ErrorCode | undefined>;
    isMute(): boolean;
    sendMessage(namespace: string, data: any): Promise<chrome.cast.ErrorCode | undefined>;
    addMessageListener(
      namespace: string,
      listener: (namespace: string, message: string) => void,
    ): void;
    removeMessageListener(
      namespace: string,
      listener: (namespace: string, message: string) => void,
    ): void;
    loadMedia(request: chrome.cast.media.LoadRequest): Promise<chrome.cast.ErrorCode | undefined>;
    getMediaSession(): chrome.cast.media.Media | null;
    addEventListener<T extends keyof CastSessionEvents>(
      type: T,
      handler: (event: CastSessionEvents[T]) => void,
    ): void;
    removeEventListener<T extends keyof CastSessionEvents>(
      type: T,
      handler: (event: CastSessionEvents[T]) => void,
    ): void;
  }

  export interface CastSessionEvents {
    [SessionEventType.ACTIVE_INPUT_STATE_CHANGED]: ActiveInputStateEventData;
    [SessionEventType.APPLICATION_METADATA_CHANGED]: ApplicationMetadataEventData;
    [SessionEventType.APPLICATION_STATUS_CHANGED]: ApplicationStatusEventData;
    [SessionEventType.MEDIA_SESSION]: MediaSessionEventData;
    [SessionEventType.VOLUME_CHANGED]: VolumeEventData;
  }

  export class RemotePlayerController {
    constructor(player: RemotePlayer);
    playOrPause(): void;
    stop(): void;
    seek(): void;
    muteOrUnmute(): void;
    setVolumeLevel(): void;
    getFormattedTime(timeInSec: number): string;
    getSeekPosition(currentTime: number, duration: number): number;
    getSeekTime(currentPosition: number, duration: number): number;
    addEventListener(
      type: RemotePlayerEventType,
      handler: (event: RemotePlayerChangedEvent) => void,
    ): void;
    removeEventListener(
      type: RemotePlayerEventType,
      handler: (event: RemotePlayerChangedEvent) => void,
    ): void;
  }

  export interface SavedPlayerState {
    mediaInfo: chrome.cast.media.PlayerState | null;
    currentTime: number;
    isPaused: boolean;
  }

  export class RemotePlayer {
    isConnected: boolean;
    isMediaLoaded: boolean;
    duration: number;
    currentTime: number;
    volumeLevel: number;
    canControlVolume: boolean;
    isPaused: boolean;
    isMuted: boolean;
    canPause: boolean;
    canSeek: boolean;
    displayName: string;
    statusText: string;
    title: string;
    displayStatus: string;
    liveSeekableRange?: chrome.cast.media.LiveSeekableRange | undefined;
    mediaInfo?: chrome.cast.media.MediaInfo | undefined;
    imageUrl: string | null;
    playerState: chrome.cast.media.PlayerState | null;
    savedPlayerState: SavedPlayerState | null;
    controller: RemotePlayerController | null;
  }

  export class ApplicationMetadata {
    constructor(sessionObj: chrome.cast.Session);
    applicationId: string;
    images: chrome.cast.Image[];
    name: string;
    namespaces: string[];
  }

  export abstract class EventData {
    constructor(type: string);
    type: string;
  }

  export class ActiveInputStateEventData extends EventData {
    constructor(activeInputState: ActiveInputState);
    activeInputState: ActiveInputState;
  }

  export class ApplicationMetadataEventData extends EventData {
    constructor(metadata: ApplicationMetadata);
    metadata: ApplicationMetadata;
  }

  export class ApplicationStatusEventData extends EventData {
    constructor(status: string);
    status: string;
  }

  export class CastStateEventData extends EventData {
    constructor(castState: CastState);
    castState: CastState;
  }

  export class MediaSessionEventData extends EventData {
    constructor(mediaSession: chrome.cast.media.Media);
    mediaSession: chrome.cast.media.Media;
  }

  export class RemotePlayerChangedEvent<T = any> extends EventData {
    constructor(type: RemotePlayerEventType, field: string, value: T);
    field: string;
    value: T;
  }

  export class SessionStateEventData extends EventData {
    constructor(
      session: CastSession,
      sessionState: SessionState,
      opt_errorCode: chrome.cast.ErrorCode,
    );
    errorCode: chrome.cast.ErrorCode;
    session: CastSession;
    sessionState: SessionState;
  }

  export class VolumeEventData extends EventData {
    constructor(volume: number, isMute: boolean);
    isMute: boolean;
    volume: number;
  }
}
