Feature: Inventories
  As a client of ikarus webapp
  I want to manage items in inventories
  So that I have toys for the arma3 mission

  Scenario: Asserting items in armory and inventory
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    When "Manatee-Men" has "1" "CUP_arifle_AK74" in armory
    And "John Doe" has "1" "CUP_arifle_AK74" in his inventory
    Then "Manatee-Men" should have "1" "CUP_arifle_AK74" in armory
    And "John Doe" should have "1" "CUP_arifle_AK74" in his inventory

  Scenario: Moving item from company armory to player inventory
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    And I am logged in as "John Doe"
    When I add "CUP_arifle_AK74" to my inventory
    Then "Manatee-Men" should have "4" "CUP_arifle_AK74" in armory
    Then "John Doe" should have "1" "CUP_arifle_AK74" in his inventory

  Scenario: Returning item from player inventory to company armory
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    And "John Doe" has "1" "CUP_arifle_AK74" in his inventory
    And I am logged in as "John Doe"
    When I remove "CUP_arifle_AK74" from my inventory
    Then "Manatee-Men" should have "6" "CUP_arifle_AK74" in armory
    Then "John Doe" should have "0" "CUP_arifle_AK74" in his inventory

  Scenario: Returning orphaned magazines to armory when weapon is removed
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    And "John Doe" has "1" "CUP_arifle_AK74" in his inventory
    And "John Doe" has "5" "CUP_30Rnd_545x39_AK_M" in his inventory
    And I am logged in as "John Doe"
    When I remove "CUP_arifle_AK74" from my inventory
    Then "Manatee-Men" should have "6" "CUP_arifle_AK74" in armory
    Then "Manatee-Men" should have "5" "CUP_30Rnd_545x39_AK_M" in armory
    Then "John Doe" should have "0" "CUP_arifle_AK74" in his inventory
    Then "John Doe" should have "0" "CUP_30Rnd_545x39_AK_M" in his inventory

  Scenario: Magazines fitting multiple weapons should only be orphan when all weapons are removed
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And "John Doe" connects to server "test-server"
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    And "John Doe" has "1" "CUP_arifle_AK74" in his inventory
    And "John Doe" has "1" "CUP_arifle_AK107" in his inventory
    And "John Doe" has "5" "CUP_30Rnd_545x39_AK_M" in his inventory
    And I am logged in as "John Doe"
    When I remove "CUP_arifle_AK74" from my inventory
    Then "Manatee-Men" should have "6" "CUP_arifle_AK74" in armory
    Then "Manatee-Men" should have "0" "CUP_30Rnd_545x39_AK_M" in armory
    Then "John Doe" should have "0" "CUP_arifle_AK74" in his inventory
    Then "John Doe" should have "5" "CUP_30Rnd_545x39_AK_M" in his inventory
