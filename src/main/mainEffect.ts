import { Effect } from "effect"
import { LoggerLive } from "./effects/logging"


const program = Effect.gen(function* () {
  yield* Effect.log("Hello in a generator")
})

const provisionedProgram = program.pipe(
  Effect.provide(LoggerLive)
)

export const startMain: () => Promise<void> =
  () => Effect.runPromise(provisionedProgram)

