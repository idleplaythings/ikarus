Feature: Servers
  As a ikarus webapp
  I want to be able to have servers
  So that I can provide service

  Scenario: Register server
    When server "test-server" is registered
    Then server "test-server" should exist

