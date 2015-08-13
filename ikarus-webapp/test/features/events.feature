Feature: GameEvent
  As a Ikarus web application
  I want to know what happens in game
  So that i can show the players reports of completed games

  Scenario: Game waiting event
    Given "1" squads are minimum to start a game
    And severs wait "1" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I am ready
    And I enter my squad to the queue
    And I am logged in as server "test-server"
    And "John Doe" connects to server "test-server"
    And servers have been checked for game start
    Then status for server "test-server" should be "waiting"
    And server "test-server" should have game waiting event

  Scenario: Game start event
    Given "1" squads are minimum to start a game
    And severs wait "1" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I am ready
    And I enter my squad to the queue
    And I am logged in as server "test-server"
    And "John Doe" connects to server "test-server"
    When status for server "test-server" changed long ago
    And servers have been checked for game start
    Then status for server "test-server" should be "playing"
    And server "test-server" should have game started event

  Scenario: Game end event
    Given "1" squads are minimum to start a game
    And severs wait "1" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I am ready
    And I enter my squad to the queue
    And I am logged in as server "test-server"
    And "John Doe" connects to server "test-server"
    And status for server "test-server" changed long ago
    And servers have been checked for game start
    And status for server "test-server" should be "playing"
    When I am logged in as server "test-server"
    And server "test-server" has status "idle"
    Then server "test-server" should have game end event

  Scenario: Player killed event
    Given player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And company "Manatee-WOMEN" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-WOMEN"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "playing"
    And server "test-server" has gameId
    When player "John Doe" is killed by "Jane Doe" on server "test-server"
    Then server "test-server" should have player killed events for "John Doe" and "Jane Doe"

  Scenario: Player connected event
    Given "1" squads are minimum to start a game
    And severs wait "1" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And server "test-server" has gameId
    And I am logged in as "John Doe"
    And I create a squad
    And I am ready
    And I enter my squad to the queue
    And I am logged in as server "test-server"
    When servers have been checked for game start
    When "John Doe" connects to server "test-server"
    Then server "test-server" should have player connected event for "John Doe"

  Scenario: Player connected event
    Given "1" squads are minimum to start a game
    And severs wait "1" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And server "test-server" has gameId
    And I am logged in as "John Doe"
    And I create a squad
    And I am ready
    And I enter my squad to the queue
    And I am logged in as server "test-server"
    When servers have been checked for game start
    When "John Doe" connects to server "test-server"
    And "John Doe" disconnects from server "test-server"
    Then server "test-server" should have player disconnected event for "John Doe"

  Scenario: Mission loot event
    Given "1" squads are minimum to start a game
    And severs wait "2" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I am ready
    And I enter my squad to the queue
    And I am logged in as server "test-server"
    And "John Doe" connects to server "test-server"
    And status for server "test-server" changed long ago
    And servers have been checked for game start
    And Squad that has player "John Doe" should be playing on server "test-server"
    And status for server "test-server" should be "playing"
    When mission loot "guard_objective_reward2" is sent from server "test-server" to squad containing "John Doe" from objective "Guard"
    Then server "test-server" and player "John Doe" should have mission loot event

  Scenario: Raid event
    Given player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And company "Manatee-WOMEN" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-WOMEN"
    And I am logged in as "John Doe"
    And I create a squad
    And I am logged in as "Jane Doe"
    And I create a squad
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "playing"
    And server "test-server" has gameId
    When "John Doe" wins "Jane Doe" in a raid on server "test-server"
    Then server "test-server" should have raid events for "Manatee-Men" and "Manatee-WOMEN"

