import { autoBindSteps, loadFeatures } from 'jest-cucumber'
import steps from './steps'

const features = loadFeatures('src/__tests__/features/*.feature', {
  tagFilter: 'not @skip and not @manual and not @ignore and (@single or @test or @run)'
})

autoBindSteps(features, steps)
