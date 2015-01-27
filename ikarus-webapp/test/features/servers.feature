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
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And I am logged in as "Jane Doe"
    And I create a squad
    And I enter my squad to the queue
    And I am logged in as server "test-server"
    And "John Doe" connects to server "test-server"
    And "Jane Doe" connects to server "test-server"
    And status for server "test-server" should be "waiting"
    When servers have been checked for game start
    Then status for server "test-server" should be "waiting"
    When server waiting period has elapsed for server "test-server"
    And servers have been checked for game start
    And Squad that has player "John Doe" should be playing on server "test-server"
    And Squad that has player "Jane Doe" should be playing on server "test-server"
    Then status for server "test-server" should be "playing"

  Scenario: Server not going to waiting if not enough squads
    Given "2" squads are minimum to start a game
    And severs wait "2" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And I am logged in as server "test-server"
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
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    When I leave my squad
    Then no squad inventories should exists
    And no squads should exist
    And there should not be squads playing on server "test-server"

  Scenario: Squad is added to waiting server instead of idle server
    Given "2" squads are minimum to start a game
    And severs wait "2" minutes for additional players before starting
    And servers abort waiting if only "-1" squad is on server
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And server "test-server2" is registered
    And I am logged in as server "test-server2"
    And server "test-server2" has status "waiting"
    And I am logged in as "John Doe"
    And I create a squad
    When I enter my squad to the queue
    Then Squad that has player "John Doe" should be playing on server "test-server2"

  Scenario: Squad is added to server that has space
    Given "1" squads are minimum to start a game
    And servers can fit "1" player
    And player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Women" exists
    And "Jane Doe" is a member of company "Manatee-Women"
    And server "full-server1" is registered
    And I am logged in as server "full-server1"
    And server "full-server1" has status "idle"
    And server "full-server2" is registered
    And I am logged in as server "full-server2"
    And server "full-server2" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "full-server1"
    And I am logged in as "Jane Doe"
    And I create a squad
    When I enter my squad to the queue
    Then Squad that has player "Jane Doe" should be playing on server "full-server2"

  Scenario: Server aborting waiting, if squads leave
    Given "2" squads are minimum to start a game
    And servers abort waiting if only "1" squad is on server
    And severs wait "2" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And company "Manatee-WOMEN" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-WOMEN"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And I am logged in as "Jane Doe"
    And I create a squad
    And I enter my squad to the queue
    And I am logged in as server "test-server"
    And "John Doe" connects to server "test-server"
    And "Jane Doe" connects to server "test-server"
    And status for server "test-server" should be "waiting"
    And I am logged in as "Jane Doe"
    When I leave my squad
    Then status for server "test-server" should be "down"
    And Squad that has player "John Doe" should be on queue in region "EU" at index "0"
    Then player "Jane Doe" should not have a squad


  Scenario: Server allowing squads in for only certain time
    Given "1" squads are minimum to start a game
    And severs wait "2" minutes for additional players before starting
    And player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And company "Manatee-WOMEN" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-WOMEN"
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And I am logged in as server "test-server"
    And "John Doe" connects to server "test-server"
    And status for server "test-server" should be "waiting"
    And server waiting period has elapsed for server "test-server"
    And I am logged in as "Jane Doe"
    And I create a squad
    When I enter my squad to the queue
    Then Squad that has player "John Doe" should be playing on server "test-server"
    And Squad that has player "Jane Doe" should not be playing on server "test-server"
    And Squad that has player "Jane Doe" should be on queue in region "EU" at index "0"
    Then status for server "test-server" should be "playing"

  Scenario: Only one squad per company allowed per server
    Given "1" squads are minimum to start a game
    And player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-Men"
    And server "test-server1" is registered
    And I am logged in as server "test-server1"
    And server "test-server1" has status "idle"
    And server "test-server2" is registered
    And I am logged in as server "test-server2"
    And server "test-server2" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And I am logged in as "Jane Doe"
    And I create a squad
    When I enter my squad to the queue
    Then status for server "test-server1" should be "waiting"
    And status for server "test-server2" should be "waiting"
    Then Squad that has player "John Doe" should be playing on server "test-server1"
    And Squad that has player "Jane Doe" should be playing on server "test-server2"
