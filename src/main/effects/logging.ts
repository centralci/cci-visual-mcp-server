import { NodeFileSystem } from "@effect/platform-node"
import { Layer, Logger, FiberId, LogLevel, Cause, FiberRefs, List, LogSpan, HashMap } from "effect"
import { homedir } from 'os'
import { createStream } from "rotating-file-stream"
import { join } from "path"

const rolloverDefaults = {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
}

type LogFields = {
  fiberId: FiberId.FiberId
  logLevel: LogLevel.LogLevel
  message: unknown
  cause: Cause.Cause<unknown>
  context: FiberRefs.FiberRefs
  spans: List.List<LogSpan.LogSpan>
  annotations: HashMap.HashMap<string, unknown>
  date: Date
}

function mkRollingLogger(filename: string, fmt: (LogFields) => string): Logger.Logger<unknown, void> {
  const stream = createStream(
    join(homedir(), ".cci-concourse-mcp", "logs", filename),
    rolloverDefaults
  )
  return Logger.make((event) => {
    stream.write(fmt(event))
  })
}

const jsonRolloverFileLogger = mkRollingLogger(
  'mcp.json',
  (evt) => JSON.stringify(evt) + '\n'
)
const textRolloverFileLogger = mkRollingLogger(
  'mcp.log',
  ({logLevel, message, date}) => `[${logLevel.label}] ${date.toISOString()} - ${message}\n`
)


// Replace the default logger, providing NodeFileSystem
// to access the file system
export const LoggerLive = Logger.replace(
  Logger.defaultLogger,
  Logger.zip(jsonRolloverFileLogger, textRolloverFileLogger)
).pipe(Layer.provide(NodeFileSystem.layer))


