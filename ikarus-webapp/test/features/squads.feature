Feature: Squads
  As a player
  I want to create and manage a squad
  So that I can play on servers

  Scenario: Creating a squad
    Given player "John Doe" with Steam ID "123" exists
    And I am logged in as "John Doe"
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    When I create a squad
    Then player "John Doe" should have a squad
    Then player "John Doe" should have an inventory

  Scenario: Joining a squad
    Given player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And I am logged in as "Jane Doe"
    When I join a same squad as "John Doe"
    Then player "John Doe" should have a squad
    Then player "John Doe" should have an inventory
    Then player "Jane Doe" should have a squad
    Then player "Jane Doe" should have an inventory

  Scenario: Leaving a squad
    Given player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And I am logged in as "Jane Doe"
    And I join a same squad as "John Doe"
    When I leave my squad
    Then player "John Doe" should have a squad
    Then player "John Doe" should have an inventory
    Then player "Jane Doe" should not have a squad

  Scenario: Leaving a while being the last member
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    When I leave my squad
    Then player "John Doe" should not have a squad
    Then no squad inventories should exists
    Then no squads should exist

  Scenario: Squad being added to the queue
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "playing"
    And I am logged in as "John Doe"
    And I create a squad
    When I enter my squad to the queue
    And Squad that has player "John Doe" should be on queue in region "EU" at index "0"

  Scenario: Squad being added to server and player connecting
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "waiting"
    And I am logged in as "John Doe"
    And I create a squad
    When I enter my squad to the queue
    And "John Doe" connects to server "test-server"
    Then Squad that has player "John Doe" should be playing on server "test-server"
    Then server "test-server" should have a player with Steam ID "123"

  Scenario: Trying to join server before squad is on server
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "playing"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    When "John Doe" connects to server "test-server"
    Then server "test-server" should not have a player with Steam ID "123"

  Scenario: Being too slow to join the server and losing slot in squad
    Given player "John Doe" with Steam ID "123" exists
    Given player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "waiting"
    And I am logged in as "John Doe"
    And I create a squad
    And I am logged in as "Jane Doe"
    And I join a same squad as "John Doe"
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    And "John Doe" connects to server "test-server"
    And deadline for connecting to game on squad that has player "Jane Doe" has elapsed
    Then player "Jane Doe" should have a squad
    When squad deadlines are checked
    And "Jane Doe" connects to server "test-server"
    Then server "test-server" should not have a player with Steam ID "321"
    Then player "Jane Doe" should not have a squad

  Scenario: Being too slow to join the server and squad is removed
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "waiting"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    And deadline for connecting to game on squad that has player "John Doe" has elapsed
    Then player "John Doe" should have a squad
    When squad deadlines are checked
    And "John Doe" connects to server "test-server"
    Then server "test-server" should not have a player with Steam ID "123"
    Then no squad inventories should exists
    Then no squads should exist

  Scenario: Player being too slow to join the server and is removed from squad
    Given player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "waiting"
    And I am logged in as "John Doe"
    And I create a squad
    And I am logged in as "Jane Doe"
    And I join a same squad as "John Doe"
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    And "John Doe" connects to server "test-server"
    And deadline for connecting to game on squad that has player "John Doe" has elapsed
    When squad deadlines are checked
    And "Jane Doe" connects to server "test-server"
    Then server "test-server" should not have a player with Steam ID "321"
    Then server "test-server" should have a player with Steam ID "123"
    Then player "John Doe" should have a squad
    Then player "Jane Doe" should not have a squad

  Scenario: Player being removed from squad when disconnecting from server when game is playing
    Given player "John Doe" with Steam ID "123" exists
    Given player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "waiting"
    And I am logged in as "John Doe"
    And I create a squad
    And I am logged in as "Jane Doe"
    And I join a same squad as "John Doe"
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    And "John Doe" connects to server "test-server"
    And "Jane Doe" connects to server "test-server"
    And server "test-server" has status "playing"
    When "Jane Doe" disconnects from server "test-server"
    Then server "test-server" should not have a player with Steam ID "321"
    Then player "Jane Doe" should not have a squad
    Then player "John Doe" should have a squad

  Scenario: Squad entering and leaving the queue
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "down"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be on queue in region "EU" at index "0"
    When I leave my squad from the queue
    Then Squad that has player "John Doe" should not be queuing on region "EU"
    And Squad that has player "John Doe" should not be playing on server "test-server"

  Scenario: When already on server, cannot leave queue
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "waiting"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    And I leave my squad from the queue
    And Squad that has player "John Doe" should be playing on server "test-server"

  Scenario: Squads being removed when server is idle
    Given player "John Doe" with Steam ID "123" exists
    Given player "Jane Doe" with Steam ID "321" exists
    And company "Manatee-Men" exists
    And company "Manatee-WOMEN" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-WOMEN"
    And server "test-server" is registered
    And server "test-server" has status "waiting"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And I am logged in as "Jane Doe"
    And I create a squad
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    And Squad that has player "Jane Doe" should be playing on server "test-server"
    And "John Doe" connects to server "test-server"
    And "Jane Doe" connects to server "test-server"
    And server "test-server" has status "playing"
    When server "test-server" has status "idle"
    Then no squad inventories should exists
    Then no squads should exist

  Scenario: Server coming up and letting squads from the queque to the server
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And server "test-server" is registered
    And server "test-server" has status "idle"
    And I am logged in as "John Doe"
    And I create a squad
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be on queue in region "EU" at index "0"
    When server "test-server" has status "waiting"
    Then Squad that has player "John Doe" should be playing on server "test-server"

Scenario: Squads can only have fixed amount of people
    Given player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "321" exists
    And squad can have "1" members
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And player "John Doe" should have a squad
    And I am logged in as "Jane Doe"
    When I join a same squad as "John Doe"
    Then player "Jane Doe" should not have a squad



