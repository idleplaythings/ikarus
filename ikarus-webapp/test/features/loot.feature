Feature: Loot
  As Ikarus web application
  I want to receive loot from monitor
  So that my players can use the loot

  Scenario: Receiving mission loot from supply mission
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    When mission loot "test-loot" is sent from server "test-server" to squad containing "John Doe" from objective "Supply"
    Then "Manatee-Men" should have "1" "CUP_srifle_LeeEnfield" in armory
    And "Manatee-Men" should have "5" "CUP_10x_303_M" in armory

  Scenario: Receiving mission loot from guard mission
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    When mission loot "guard_objective_reward2" is sent from server "test-server" to squad containing "John Doe" from objective "Guard"
    Then "Manatee-Men" should have "1" "CUP_arifle_AK74" in armory

  Scenario: Cant get loot backpacks from guard mission
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    When mission loot "test-loot" is sent from server "test-server" to squad containing "John Doe" from objective "Guard"
    Then "Manatee-Men" should have "0" "CUP_srifle_LeeEnfield" in armory
