Feature: Inventories
  As a client of ikarus webapp
  I want to manage items in inventories
  So that I have toys for the arma3 mission

  Scenario: Asserting items in armory and inventory
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    When "Manatee-Men" has "1" "CUP_arifle_AK74" in armory
    And "John Doe" has "1" "CUP_arifle_AK74" in his inventory
    Then "Manatee-Men" should have "1" "CUP_arifle_AK74" in armory
    And "John Doe" should have "1" "CUP_arifle_AK74" in his inventory

  Scenario: Moving item from company armory to player inventory
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    And I am logged in as "John Doe"
    When I add "CUP_arifle_AK74" to my inventory
    Then "Manatee-Men" should have "4" "CUP_arifle_AK74" in armory
    Then "John Doe" should have "1" "CUP_arifle_AK74" in his inventory

  Scenario: Squad inventory should only fit 30 items per player
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    And "John Doe" has "30" "CUP_arifle_AK74" in his inventory
    And I am logged in as "John Doe"
    When I add "CUP_arifle_AK74" to my inventory
    Then "Manatee-Men" should have "5" "CUP_arifle_AK74" in armory
    Then "John Doe" should have "30" "CUP_arifle_AK74" in his inventory

  Scenario: Returning item from player inventory to company armory
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    And "John Doe" has "1" "CUP_arifle_AK74" in his inventory
    And I am logged in as "John Doe"
    When I remove "CUP_arifle_AK74" from my inventory
    Then "Manatee-Men" should have "6" "CUP_arifle_AK74" in armory
    Then "John Doe" should have "0" "CUP_arifle_AK74" in his inventory

  Scenario: Returning orphaned magazines to armory when weapon is removed
    Given player "John Doe" with Steam ID "123" exists
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
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
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
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

  Scenario: Squads disbanding before being locked get loot back
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "down"
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And "John Doe" has "1" "CUP_arifle_AK74" in his inventory
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be on queue in region "EU" at index "0"
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    When I leave my squad
    Then there should not be squads queuing on server "test-server"
    Then "Manatee-Men" should have "6" "CUP_arifle_AK74" in armory
    Then no squad inventories should exists
    Then no squads should exist

  Scenario: Players disconnecting after squad is locked will NOT get the loot back
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And "John Doe" has "1" "CUP_arifle_AK74" in his inventory
    And I am ready
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    And I leave my squad
    And "Manatee-Men" should have "5" "CUP_arifle_AK74" in armory
    And player "John Doe" should not have a squad
    And I am logged in as server "test-server"
    When server "test-server" has status "idle"
    Then "Manatee-Men" should have "5" "CUP_arifle_AK74" in armory
    Then no squad inventories should exists
    Then no squads should exist

  Scenario: Cannot add, or remove stuff from locked inventory
    Given player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "124" exists
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And "John Doe" has "1" "hlc_rifle_ak74" in his inventory
    And I am ready
    And I enter my squad to the queue
    And "Manatee-Men" has "5" "hlc_rifle_ak74" in armory
    And "Manatee-Men" has "5" "hlc_rifle_rpk74n" in armory
    And I am logged in as "John Doe"
    When I remove "hlc_rifle_ak74" from my inventory
    And I add "hlc_rifle_rpk74n" to my inventory
    Then "Manatee-Men" should have "5" "hlc_rifle_ak74" in armory
    Then "Manatee-Men" should have "5" "hlc_rifle_rpk74n" in armory
    Then "John Doe" should have "0" "hlc_rifle_rpk74n" in his inventory
    Then "John Doe" should have "1" "hlc_rifle_ak74" in his inventory

  Scenario: If server changes status from waiting to idle, squads get items back
    Given player "John Doe" with Steam ID "123" exists
    And server "test-server" is registered
    And I am logged in as server "test-server"
    And server "test-server" has status "idle"
    And company "Manatee-Men" exists
    And "John Doe" is a member of company "Manatee-Men"
    And I am logged in as "John Doe"
    And I create a squad
    And "John Doe" has "1" "CUP_arifle_AK74" in his inventory
    And I am ready
    And I enter my squad to the queue
    And Squad that has player "John Doe" should be playing on server "test-server"
    And "Manatee-Men" has "5" "CUP_arifle_AK74" in armory
    And I am logged in as server "test-server"
    When server "test-server" has status "idle"
    Then "Manatee-Men" should have "6" "CUP_arifle_AK74" in armory
    Then no squad inventories should exists
    Then no squads should exist