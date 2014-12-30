Feature: Loot
  As Ikarus web application
  I want to receive loot from monitor
  So that my players can use the loot

  Scenario: Receiving mission loot
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    When mission loot "test-loot" is sent from server "test-server" to squad containing "John Doe"
    Then "Manatee-Men" should have "1" "CUP_srifle_LeeEnfield" in armory
    And "Manatee-Men" should have "5" "CUP_10x_303_M" in armory
