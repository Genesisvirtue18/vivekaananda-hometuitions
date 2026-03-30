package com.vivekanand.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class ChildDTO {
    private Long id;
    private String childName;
    private String grade;
    private String board;
    private List<String> subjects; // ✅ add this

    public ChildDTO(Long id, String childName, String grade, String board, List<String> subjects) {
        this.id = id;
        this.childName = childName;
        this.grade = grade;
        this.board = board;
        this.subjects = subjects;
    }
}
