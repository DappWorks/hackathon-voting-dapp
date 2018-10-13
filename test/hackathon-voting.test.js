/* globals describe, it, artifacts, contract, before, beforeEach, after, assert, web3 */

// Activate verbose mode by setting env var `export DEBUG=voting`
// require('babel-polyfill')
const debug = require('debug')('voting')
// const BN = require('bignumber.js')
const util = require('./util.js')
const { DECIMALS } = util
const HackathonVoting = artifacts.require('./HackathonVoting.sol')

contract('HackathonVoting', function(accounts) {
  // This only runs once across all test suites
  before(() => util.measureGas(accounts))
  after(() => util.measureGas(accounts))
  const eq = assert.equal.bind(assert)
  const user1 = accounts[0]
  const user2 = accounts[1]

  async function deployContract() {
    debug('deploying contract')

    this.voting = await HackathonVoting.new()
  }

  describe('Initial state', function() {
    beforeEach(deployContract)

    it('should have 0 teams', async function() {
      const teamCount = await this.voting.totalTeams.call()

      eq(teamCount.toNumber(), 0)
    })
  })

  describe('Submit team', function() {
    beforeEach(deployContract)

    it('should be able to submit team', async function() {
      eq((await this.voting.totalTeams.call()).toNumber(), 0)
      await this.voting.submitTeam("Team Name", "https://github.com/123")
      eq((await this.voting.totalTeams.call()).toNumber(), 1)
    })

    it('should not be able to submit more than one team', async function() {
      eq((await this.voting.totalTeams.call()).toNumber(), 0)
      await this.voting.submitTeam("Team Name", "https://github.com/123")
      eq((await this.voting.totalTeams.call()).toNumber(), 1)
      await util.expectThrow(this.voting.submitTeam("Team Name 2", "https://github.com/456"))
      eq((await this.voting.totalTeams.call()).toNumber(), 1)
    })
  })

  describe('Get team', function() {
    beforeEach(deployContract)

    it('should be able to submit team', async function() {
      await this.voting.submitTeam("Team Name", "https://github.com/123")

      const team = await this.voting.getTeam.call(1)

      const [
        submitter,
        name,
        github,
        technical,
        creativity,
        usefulness,
        general,
        totalPoints,
      ] = team

      eq(submitter, user1)
      eq(name, "Team Name")
      eq(github, "https://github.com/123")
      eq(technical.toNumber(), 0)
      eq(creativity.toNumber(), 0)
      eq(usefulness.toNumber(), 0)
      eq(general.toNumber(), 0)
      eq(totalPoints.toNumber(), 0)
    })
  })

  describe('Vote', function() {
    beforeEach(deployContract)

    it('should be able to vote', async function() {
      await this.voting.submitTeam("Team Name", "https://github.com/123")

      await this.voting.vote(1, 7, 6, 9, 4)
    })

    it('should not be able to vote more than once for a team', async function() {
      await this.voting.submitTeam("Team Name", "https://github.com/123")

      await this.voting.vote(1, 7, 6, 9, 4)
      await util.expectThrow(this.voting.vote(1, 7, 6, 9, 4))
    })

    it('should be able to award 10 points per category', async function() {
      await this.voting.submitTeam("Team Name", "https://github.com/123")

      await this.voting.vote(1, 10, 10, 10, 10)
    })

    it('should not be able to award more than 10 points per category', async function() {
      await this.voting.submitTeam("Team Name", "https://github.com/123")

      await util.expectThrow(this.voting.vote(1, 11, 6, 9, 4))
      await util.expectThrow(this.voting.vote(1, 10, 11, 9, 4))
      await util.expectThrow(this.voting.vote(1, 10, 6, 11, 4))
      await util.expectThrow(this.voting.vote(1, 10, 6, 9, 11))
    })
  })
})
