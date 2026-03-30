package com.vivekanand.DTO;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LanguageProficiencyDTO {
    private String language;
    private String proficiency;
}
