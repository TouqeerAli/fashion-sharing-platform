package com.azmi.modal;

import jakarta.persistence.*;

@Entity
public class RentOutSize {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Integer shoulder;
    private Integer chest;
    private Integer waist;
    private Integer topLength;
    private Integer hip;
    private Integer sleeves	;
    private Integer armHole;
    private Integer bottomLength;
    private Integer bottomWaist;
    private Integer innerLength;

    @OneToOne(mappedBy = "rentOutSize")
    private RentOut rentOut;




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getShoulder() {
        return shoulder;
    }

    public void setShoulder(Integer shoulder) {
        this.shoulder = shoulder;
    }

    public Integer getChest() {
        return chest;
    }

    public void setChest(Integer chest) {
        this.chest = chest;
    }

    public Integer getWaist() {
        return waist;
    }

    public void setWaist(Integer waist) {
        this.waist = waist;
    }

    public Integer getTopLength() {
        return topLength;
    }

    public void setTopLength(Integer topLength) {
        this.topLength = topLength;
    }

    public Integer getHip() {
        return hip;
    }

    public void setHip(Integer hip) {
        this.hip = hip;
    }

    public Integer getSleeves() {
        return sleeves;
    }

    public void setSleeves(Integer sleeves) {
        this.sleeves = sleeves;
    }

    public Integer getArmHole() {
        return armHole;
    }

    public void setArmHole(Integer armHole) {
        this.armHole = armHole;
    }

    public Integer getBottomLength() {
        return bottomLength;
    }

    public void setBottomLength(Integer bottomLength) {
        this.bottomLength = bottomLength;
    }

    public Integer getBottomWaist() {
        return bottomWaist;
    }

    public void setBottomWaist(Integer bottomWaist) {
        this.bottomWaist = bottomWaist;
    }

    public Integer getInnerLength() {
        return innerLength;
    }

    public void setInnerLength(Integer innerLength) {
        this.innerLength = innerLength;
    }
}
