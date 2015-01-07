Feature: Players on server
  As a monitor of arma3 server
  I want to manage player state
  So that the ikarus webapp has the correct state

  Scenario: Connecting to a server
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    When "John Doe" connects to server "test-server"
    Then player "John Doe" should have a squad
    Then server "test-server" should have a player with Steam ID "123"
    Then player "John Doe" should have an inventory

  Scenario: Disconnecting from a server
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    When "John Doe" disconnects from server "test-server"
    Then player "John Doe" should not have a squad
    Then server "test-server" should not have a player with Steam ID "123"
    Then no squad inventories should exists
    Then no squads should exist

  Scenario: Non empty squads should not be removed
    Given player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "124" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "Jane Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    And "Jane Doe" connects to server "test-server"
    When "John Doe" disconnects from server "test-server"
    Then player "Jane Doe" should have a squad
    Then server "test-server" should have a player with Steam ID "124"
    Then player "Jane Doe" should have an inventory
