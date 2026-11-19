package com.oishidam.review.dto;

import tools.jackson.core.JsonParser;
import tools.jackson.databind.DeserializationContext;
import tools.jackson.databind.ValueDeserializer;

public class ReviewRatingDeserializer extends ValueDeserializer<Integer> {
    @Override
    public Integer deserialize(JsonParser parser, DeserializationContext context) {
        if (!parser.isExpectedNumberIntToken()) {
            return context.reportInputMismatch(Integer.class, "별점은 1~5 사이의 정수로 입력해 주세요.");
        }
        return parser.getIntValue();
    }
}
