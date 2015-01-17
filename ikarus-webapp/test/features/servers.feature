Feature: Servers
  As a ikarus webapp
  I want to be able to have servers
  So that I can provide service

  Scenario: Register server
    When server "test-server" is registered
    Then server "test-server" should exist

  Scenario: Server waiting before starting the game
    Given "2" squads are minimum to start a game
    And severs wait "2" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And company "Manatee-WOMEN" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-WOMEN"
    And server "test-server" is registered
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And I am logged in as "Jane Doe"
    And I create a squad
    And I enter my squad to the queue
    And "John Doe" connects to server "test-server"
    And "Jane Doe" connects to server "test-server"
    And status for server "test-server" should be "waiting"
    When servers have been checked for game start
    Then status for server "test-server" should be "waiting"
    When server waiting period has elapsed for server "test-server"
    And servers have been checked for game start
    Then status for server "test-server" should be "playing"

  Scenario: Server not going to waiting if not enough squads
    Given "2" squads are minimum to start a game
    And severs wait "2" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    When I enter my squad to the queue
    Then status for server "test-server" should be "idle"

  Scenario: Squad joins a server and then leaves it before server is playing
    Given "1" squads are minimum to start a game
    And severs wait "2" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    When I leave my squad
    Then no squad inventories should exists
    And no squads should exist
    And there should not be squads playing on server "test-server"


